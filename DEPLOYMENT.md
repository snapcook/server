# Snapcook Server Deployment

### Step-step

1. Prepare the source code, clone this repo

```sh
git clone https://github.com/snapcook/server.git
```

2. Install project dependencies

```sh
npm install
```

3. Check and config the `.env` file and variable

4. Check and config the `app.yaml` file

5. Add `storagekey.json` file

6. Run Prisma Command for setup DB

```sh
npx prisma generate
```

```sh
npx prisma migrate dev
```

7. Run seed

```sh
npm run seed
```

8. Test run the project

```sh
npm run start
```

9. Deploy the app

```sh
gcloud app deploy
```

10. Browse the deployed app

```sh
gcloud app browse
```
