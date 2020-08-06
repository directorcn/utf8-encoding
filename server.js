const Koa = require('koa');
const mount = require('koa-mount');
const fs = require('fs');

const UTF8Encoding = require('./UTF8Encoding');


const app = new Koa();

const encodeKoa = new Koa();
const decodeKoa = new Koa();

app.use(mount('/encode', encodeKoa));
app.use(mount('/decode', decodeKoa));

encodeKoa.use(
  async function(ctx, next) {
    await new Promise(resolve => {
      const { query } = ctx.query;
      const data = UTF8Encoding(query);
      setTimeout(() => {
        ctx.status = 200;
        ctx.body = { data };
        resolve();
      }, 500);
    });
  }
);

decodeKoa.use(
  async function(ctx, next) {
    await new Promise(resolve => {
      const { query } = ctx.query;
      const chars = query.split(',');
      const target = chars.map(char => +`0x${char}`);
      const buffer = Buffer.from(target);
      setTimeout(() => {
        ctx.type = 'application/octet-stream; charset=utf-8';
        ctx.status = 200;
        ctx.body = buffer;
        resolve();
      }, 500);
    });
  }
);

app.use(
  mount('/', async (ctx) => {
    ctx.body = fs.readFileSync(__dirname + '/index.html', 'utf-8');
  })
);

app.listen(5000);
