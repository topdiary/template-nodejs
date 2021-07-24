# Template Service

To get NodeJS service started quickly.

- Docker (Multi-stage build)
- Docker Compose
- TypeScript
- Lint
- ENV
- Express
- syslog

## Usage

```bash
# [Makefile] create local network 🌑
make network

# [Makefile] local build 📦
make build

# [Makefile] build & start service 📦 🚀
make reup

# [Makefile] start service 🚀
make up

# [Makefile] logs 💬
make logs

# [Makefile] shell into service 🐚
make sh

# [Makefile] down service 💤
make down

# [Makefile] test service 🧪
make test

# [Makefile] down service & cleaning up 🧹
make clean
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
