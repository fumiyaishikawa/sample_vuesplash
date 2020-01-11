<?php

namespace Tests\Feature;

use App\User;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class LogoutApiTest extends TestCase {

    use RefreshDatabase;

   public function setUp():void {
       parent::setUp();

       //テストユーザー作成
       $this->user = factory(User::class)->create();
   }

   /**
    * @test
    */
    public function should_認証済みのユーザーをログアウトさせる() {
        // actingAsヘルパで現在認証済みのユーザーを指定する
        // ログアウトページへリクエストを送信
        $response = $this->actingAs($this->user)->json('POST', route('logout'));

        // ログアウト後のレスポンスで、HTTPステータスコードが正常であることを確認
        $response->assertStatus(200);
        // ユーザーが認証されていないことを確認
        $this->assertGuest();
    }
}
