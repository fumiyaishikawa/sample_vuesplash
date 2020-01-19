<?php
namespace App;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;

class Photo extends Model
{
    /** プライマリキーの型 */
    protected $keyType = 'string';

    /** IDの桁数 */
    const ID_LENGTH = 12;

    public function __construct(array $attributes = [])
    {
        parent::__construct($attributes);

        if (! Arr::get($this->attributes, 'id')) {
            $this->setId();
        }
    }

    /**
     * ランダムなID値をid属性に代入する
     */
    private function setId()
    {
        $this->attributes['id'] = $this->getRandomId();
    }

    /**
     * ランダムなID値を生成する
     * @return string
     */
    private function getRandomId()
    {
        $characters = array_merge(
            range(0, 9), range('a', 'z'),
            range('A', 'Z'), ['-', '_']
        );

        $length = count($characters);

        $id = "";

        for ($i = 0; $i < self::ID_LENGTH; $i++) {
            $id .= $characters[random_int(0, $length - 1)];
        }

        return $id;
    }

    /**
     * リレーションシップ - usersテーブル
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     * リレーション先のモデル名と関係のない名前を付ける場合は belongsTo などのメソッドの引数は省略せずに記述する必要がある
     */
    public function owner() {
        return $this->belongsTo('App\User', 'user_id', 'id', 'users');
    }

    /**
     * リレーションシップ - commentsテーブル
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function comments() {
        return $this->hasMany('App\Comment')->orderBy('id', 'desc');
    }

    /**
     * リレーションシップ - usersテーブル
     * likes テーブルを中間テーブルとした、photos テーブルと users テーブルの多対多の関連性を表しています
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function likes() {
        return $this->belongsToMany('App\User', 'likes')->withTimestamps();
    }

    //urlアクセサの定義
    /**
     * アクセサ - url
     * @return string
     */
    public function getUrlAttribute() {
        // クラウドストレージの url メソッドは S3 上のファイルの公開 URL を返却する
        // 具体的には .env で定義したAWS_URL と引数のファイル名を結合した値になります。
        return Storage::cloud()->url($this->attributes['filename']);
    }

    /**
     * アクセサ - likes_count
     * @return int
     */
    public function getLikesCountAttribute() {
        return $this->likes->count();
    }

    /**
     * アクセサ - liked_by_user
     * @return boolean
     */
    public function getLikedByUserAttribute() {
        if(Auth::guest()) {
            return false;
        }

        return $this->likes->contains(function($user) {
            return $user->id === Auth::user()->id;
        });
    }

    /** JSONに含める属性 */
    protected $appends = [
        'url', 'likes_count', 'liked_by_user',
    ];

    /**
     * JSONに含める属性
     * 逆にJSONに表示させる必要のない項目を隠す
     */
    protected $visible = [
        'id', 'owner', 'url', 'comments',
        'likes_count', 'liked_by_user',
    ];

    // ページネーションで一度に取得するアイテム数
    protected $perPage = 5;
}
