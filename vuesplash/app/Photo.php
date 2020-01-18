<?php
namespace App;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Storage;

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

    /** JSONに含める属性 */
    protected $appends = [
        'url',
    ];

    /**
     * JSONに含める属性
     * 逆にJSONに表示させる必要のない項目を隠す
     */
    protected $visible = [
        'id', 'owner', 'url',
    ];
}
