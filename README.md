# 環境
言語: Python
Webフレームワーク: Django REST Framework
DB: PostgreSQL
環境構築: Docker Compose


# 開発
## .envファイルの作成、Docker環境構築
```
$ make env
```
## コンテナの起動
```
$ make up
$ make upd :バックグラウンドで起動
```
## 起動中のDockerコンテナの停止
```
$ make stop
```

## 構築したDocker環境の削除
```
$ make down
```

## Docker環境のshellを起動
```
$ make shell
```

# Django
## projectの作成
```
$ make startproject
```

## appの作成
```
$ make startapp
```

## makemigrationsの実行
```
$ make makemigrations
```

## migrateの実行
```
$ make createsuperuser
```
