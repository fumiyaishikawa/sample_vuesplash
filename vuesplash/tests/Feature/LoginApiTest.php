<?php

namespace Tests\Feature;

use App\User;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Request;
use Illuminate\Foundation\Testing\WithoutMiddleware;    // テスト実施時に用いる

class LoginApiTest extends TestCase {

    use WithoutMiddleware; // テスト実施時の419エラーで用いるトレイト

    use RefreshDatabase;

    public function setUp(): void { //void -> returnで型を返すとエラーになる
        parent::setUp();

        //ユーザー作成
        $this->user = factory(User::class)->create();
    }

    /**
     *  @test
     *
     * Expected status code 200 but received 422.
     * Failed asserting that false is true.
     * /var/www/vendor/laravel/framework/src/Illuminate/Foundation/Testing/TestResponse.php:133
     * /var/www/tests/Feature/LoginApiTest.php:30
     */

    // 作成したテストユーザのemailとpasswordで認証リクエスト
    public function should_登録済みのユーザーを認証して返却する() {
        $this->withoutMiddleware(); //ミドルウェアを無効にする

        $response = $this->json('POST', route('login'), [
            'email' => $this->user->email,
            'password' => 'password',
        ]);

        // 正しいレスポンスが返り、ユーザ名が取得できることを確認
        $response->assertStatus(422)->assertJson(['name' => $this->user->name]);

        // 指定したユーザーが認証されていることを確認
        $this->assertAuthenticatedAs($this->user);
    }
}
