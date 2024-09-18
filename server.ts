import { Application, Router } from 'https://deno.land/x/oak/mod.ts';
import { Bson, MongoClient } from 'https://deno.land/x/mongo@v0.32.0/mod.ts';

// schema interface
interface JokeSchema {
  _id: ObjectId;
  joke: string;
}
// web-server
const app = new Application();
const PORT = Deno.env.get('PORT');
const router = new Router();
// mongoDB
const mongoClient = new MongoClient();
await mongoClient.connect('mongodb://127.0.0.1:27017');
const db = mongoClient.database('jokes');
const jokes = db.collection<JokeSchema>('jokes');

router.get('/api/jokes', async (ctx) => {
  //const randomJoke = await jokes.find();
  const allJokes = await jokes.find().toArray();
  ctx.response.body = allJokes;
  ctx.response.status = 201;
  ctx.response.type = 'json';
});

router.post('/api/jokes', async (ctx) => {
  //console.log('POST: ', await ctx.request.body().value.get('joke'));
  //console.log('POST: ', await (ctx.request.body().value.get('joke')));
  const joke = (await ctx.request.body().value).get('joke');
  console.log('POST: ', joke);
  jokes.insertOne({joke: joke});
  ctx.response.body = { message: 'Joke added successfully' };
  ctx.response.status = 201;
})

//router.get('/latestJoke', (ctx) => {
//  const body = ctx.request.body();
//})

app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Server runs on http://localhost:${PORT}`);
await app.listen({ port: PORT });
