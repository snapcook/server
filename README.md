# Snapcook Server

### Step-step

1. Prepare the environment, clone this repo

```sh
git clone https://github.com/snapcook/server.git
```

2. Install project dependencies

```sh
npm install
```

Notes:

- Skip part no. 3 & 4 if you already have PostgreSQL setup in your computer
- Or, if you prefer use Cloud SQL instance to store your data its fine

3. Setup docker

```sh
docker compose up -d
```

4. Check docker is running

```sh
docker ps
```

5. Run this. Whenever you make changes to your database that are reflected in the Prisma schema, you need to manually re-generate Prisma Client to update the generated code in the `node_modules/.prisma/client` directory and update the `migration`:

```sh
npx prisma generate
```

```sh
npx prisma migrate dev
```

```sh
npm run seed
```

6. Run the project

```sh
npm run dev
```
