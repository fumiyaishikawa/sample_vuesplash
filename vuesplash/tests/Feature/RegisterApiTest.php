<?php

namespace Tests\Feature;

use App\User;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class RegisterApiTest extends TestCase {

    use RefreshDatabase;

    /**
     * @test
     */

    public function should_新しいユーザーを作成して返却する() { //shouldではなくてtest_xx()じゃないとエラーが出る
        $data = [
            'name' => 'vuesplash user',
            'email' => 'dummy@email.com',
            'password' => 'test1234',
            'password_confirmation' => 'test1234',
        ];

        $response = $this->json('POST', route('register'), $data);

        $user = User::first();
        $this->assertEquals($data['name'], $user->name);    //assertEquals(1st, 2st)->期待される結果と実際の結果が同じか判定する

        $response->assertStatus(201)->assertJson(['name' => $user->name]);
    }
}
