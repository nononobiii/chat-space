# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
## usersテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|autofocus: true,null: false, uniqueness: true|
|email|string|null: false, email: true, uniqueness: true|
|password|string|null: false, minlength: “8”, defaflt: “”|
|repassword|string|null: false, password_confirmation: true|

### Association
- has_many :messages, through :groups_users


## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|text|text|null: false|
|image|text|  ｜

### Association
- belongs_to :users
- has_many :groups_messages


## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|autofocus: true,null: false,uniqueness: true|
|user_id|integer|null: false,foreign_key: true|

### Association
- has_many :groups_users
- has_many :groups_messages


|Column|Type|Options|
|------|----|-------|
|group_id|integer|null: false, foreign_key: true|
|message_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :groups
- belongs_to :messages


## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :groups
- belongs_to :userss