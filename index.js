const mysql = require("mysql");
const fs = require("fs");
const parse = require("csv-parse/lib/sync");
const axios = require("axios");
const { verify } = require("crypto");

// let con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "password",
//   database: "descart"
// });

let con = mysql.createConnection({
  host: "descart-db.ch8nzvor5ylw.us-east-2.rds.amazonaws.com",
  user: "descartadmin",
  password: "sJDk3KHwuLYk7WqW",
  database: "descart"
});

async function connect() {
  return new Promise((resolve, reject) => {
    con.connect((err) => {
      if (err) reject(err);
      resolve();
    });
  });
}
async function do_query(query) {
  return new Promise((resolve, reject) => {
    con.query(query, function(err, result, fields) {
      if (err) reject(err);
      resolve(result);
    });
  });
}

// NOTE: All of this commented code was used to scrape amazon and form the dataset 
//
// const headers = [
//   // Firefox 77 Mac
//    {
//       "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:77.0) Gecko/20100101 Firefox/77.0",
//       "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
//       "Accept-Language": "en-US,en;q=0.5",
//       "Referer": "https://www.google.com/",
//       "DNT": "1",
//       "Connection": "keep-alive",
//       "Upgrade-Insecure-Requests": "1"
//   },
//   // Firefox 77 Windows
//   {
//       "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:77.0) Gecko/20100101 Firefox/77.0",
//       "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
//       "Accept-Language": "en-US,en;q=0.5",
//       "Accept-Encoding": "gzip, deflate, br",
//       "Referer": "https://www.google.com/",
//       "DNT": "1",
//       "Connection": "keep-alive",
//       "Upgrade-Insecure-Requests": "1"
//   },
//   // Chrome 83 Mac
//   {
//       "Connection": "keep-alive",
//       "DNT": "1",
//       "Upgrade-Insecure-Requests": "1",
//       "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36",
//       "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
//       "Sec-Fetch-Site": "none",
//       "Sec-Fetch-Mode": "navigate",
//       "Sec-Fetch-Dest": "document",
//       "Referer": "https://www.google.com/",
//       "Accept-Encoding": "gzip, deflate, br",
//       "Accept-Language": "en-GB,en-US;q=0.9,en;q=0.8"
//   },
//   // Chrome 83 Windows 
//   {
//       "Connection": "keep-alive",
//       "Upgrade-Insecure-Requests": "1",
//       "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36",
//       "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
//       "Sec-Fetch-Site": "same-origin",
//       "Sec-Fetch-Mode": "navigate",
//       "Sec-Fetch-User": "?1",
//       "Sec-Fetch-Dest": "document",
//       "Referer": "https://www.google.com/",
//       "Accept-Encoding": "gzip, deflate, br",
//       "Accept-Language": "en-US,en;q=0.9"
//   }
// ]

// async function testRecord(record) {
//   let header = headers[[Math.floor(Math.random() * headers.length)]]
//   return axios.get(record['url'], { headers: header });
// }

// function sleep(ms) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }

// async function getRecords() {
//   let data = fs.readFileSync('amazon_data.csv', 'utf-8');
//   const records = parse(data, {
//     columns: true,
//     skip_empty_lines: true
//   })

//   let trying_idx = 0;
//   let num_retries = 2;
//   let stream = fs.createWriteStream('result_data.csv')
//   for (let i = 0; i < records.length; i++) {
//     trying_idx = i;
//     await testRecord(records[i]).then((res) => {
//       num_retries = 2;
//       let data = res.data;
//       let brand, store;
//       let store_match = data.match(/(?:Visit the )(.*)(?: Store)/);
//       let brand_match = data.match(/(?:Brand: )(.*)(?:<)/);
//       if (store_match) {
//         brand = store_match[1];
//         store = store_match[1];
//       } else {
//         brand = brand_match ? brand_match[1] : "";
//         store = "Amazon";
//       }
//       stream.write(`"${records[i]['name'].replace(/"/g, '\\"')}",${records[i]['price'].trim().slice(1)},${store},${brand},${records[i]['url']},${records[i]['image'].split('|')[0]}\n`)
//       if (store_match) {
//         store = "Amazon";
//         stream.write(`"${records[i]['name'].replace(/"/g, '\\"')}",${records[i]['price'].trim().slice(1)},${store},${brand},${records[i]['url']},${records[i]['image'].split('|')[0]}\n`)
//       }
//     }).catch((err) => { 
//       if (num_retries === 0) {
//         num_retries = 2;
//         console.log(`Timed out on index ${i}, moving on`)
//       } else {
//         num_retries--;
//         console.log(`Failed on index ${i}, retrying`)
//         i--;
//       }
//     })
//     await sleep(2000);
//   }
// }

// function fixCommasQuotes() {
//   let data = fs.readFileSync('result_data.csv', 'utf-8').split("\n");
//   let stream = fs.createWriteStream('fixed_data.csv');
//   data.forEach((line) => {
//     stream.write(`${line.split('\\"').join('""')}\n`);
//   });
// }

// function csvToJson() {
//   let data = fs.readFileSync('fixed_data.csv', 'utf-8');
//   const records = parse(data, {
//     columns: true,
//     skip_empty_lines: true
//   });

//   fs.writeFileSync('products.json', JSON.stringify(records, null, 2));
// }

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

async function insertStores() {
  let data = fs.readFileSync('final_data.csv', 'utf-8');
  const records = parse(data, {
    columns: true,
    skip_empty_lines: true
  });

  let stores = records.map((record) => `(\"${record['store']}\", NULL)`).filter(onlyUnique);
  stores[0] = `(\"Amazon\", \"https://i.pinimg.com/564x/08/5f/d8/085fd8f7819dee3b716da73d3b2de61c.jpg\")`;
  console.log(stores);
  const query = `INSERT INTO \`store\` (name, image_url) VALUES ${stores.join(',')}`
  await do_query(query);
}

async function insertBrands() {
  let data = fs.readFileSync('final_data.csv', 'utf-8');
  const records = parse(data, {
    columns: true,
    skip_empty_lines: true
  });

  const stores = records.map((record) => `(\"${record['brand']}\")`).filter(onlyUnique).filter((val, idx, self) => val !== '(\"\")');
  const query = `INSERT INTO \`manufacturer\` (name) VALUES ${stores.join(',')}`
  await do_query(query);
}

let storeMap = {};
let brandMap = {};
async function mapStoresAndBrands() {
  const stores = await do_query("SELECT * FROM `store`");
  const brands = await do_query("SELECT * FROM `manufacturer`");
  
  stores.forEach((store) => {
    storeMap[store['name']] = store['id'];
  });
  brands.forEach((brand) => {
    brandMap[brand['name']] = brand['id'];
  });
}

async function insertProducts() {
  let nameLookup = {};
  let data = [];
  JSON.parse(fs.readFileSync('products.json')).map((p) => {
    if (nameLookup[p['name']] || Number.isNaN(Number(p['price']))) return;
    nameLookup[p['name']] = true;
    data.push(p);
  });
  let values = data.map((product) => `(\"${product['name'].split("\"").join("\\\"")}\", ${product["image"] ? `\"${product["image"]}\"` : "NULL"}, ${brandMap[product['brand']] || "NULL"})`).join(',');
  let query = `INSERT INTO \`product\` (name, image_url, manufacturer_id) VALUES ${values}`;
  await do_query(query)
}

let products;
let sqlProducts;
async function insertStoreProducts() {
  sqlProducts = await do_query("SELECT * FROM `product`");

  let data = JSON.parse(fs.readFileSync('products.json'));
  products = data.map((product) => {
    let sqlP = sqlProducts.filter((p) => p['name'] == product['name'])[0]
    if (sqlP == undefined) return undefined;
    product = Object.assign({}, product, sqlP);
    return product;
  }).filter((a) => a !== undefined);
  let values = products.map((product) => {
    return `(${storeMap[product['store']]}, ${product['id']}, "${Number(product['price'].split(" ")[0]).toFixed(2).toString()}", "${product['url']}")`;
  }).join(',');
  let query = `INSERT INTO \`storeproduct\` (store_id, product_id, price, url) VALUES ${values}`;
  await do_query(query)
}

async function insertUsers() {
  let values = [];
  for (let i = 0; i < 50; i++) {
    i == 0 ? values.push(`("Nick Hughes", "hughes.nickg@gmail.com")`) : values.push(`("test${i}", "test${i}@test.com")`);
  }
  let query = `INSERT INTO \`user\` (display_name, email) VALUES ${values.join(',')}`;
  await do_query(query)
}

function randomDate() {
  let start = new Date(2020, 0, 1);
  let end = new Date();
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

async function insertPurchases() {
  let storeProducts = await do_query("SELECT * FROM `storeproduct`");
  let values = [];
  let numProducts = storeProducts.length;
  for (let i = 1; i <= 50; i++) {
    userId = i;
    numPurchases = Math.floor(Math.random() * 40) + 15;
    for (let j = 0; j < numPurchases; j++) {
      numItemsInPurchase = Math.floor(Math.random() * 12) + 1;
      items = ((numItems, numProducts, storeProducts) => {
        let items = [];
        for (let j = 0; j < numItems; j++) {
          items.push(storeProducts[Math.floor(Math.random() * numProducts)]);
        }
        return items;
      })(numItemsInPurchase, numProducts, storeProducts);
      items = items.map((item) => {
        item['price'] = Number(item['price']);
        return item;
      })
      itemIds = items.map((item) => item['product_id']);
      price = 0;
      for (let k = 0; k < items.length; k++) {
        price += items[k]['price'];
      }
      let itemInserts = items.map((item, idx) => `${item['product_id']}, "${item['price']}", 1, ${idx})`)
      values.push({
        userId, numItems: numItemsInPurchase, itemInserts, price: (1.07 * price).toFixed(2).toString()
      });
    } 
  }
  let inserts = values.map((purchase) => `(1, ${purchase['userId']}, "${purchase['price']}", ${purchase["numItems"]}, ${con.escape(randomDate())})`).join(',');
  let query = `INSERT INTO \`purchase\` (store_id, user_id, price, num_items, purchased_at) VALUES ${inserts}`;
  await do_query(query)

  let purchaseProductInserts = values.flatMap((purchase, idx) => purchase['itemInserts'].map((insert) => `(${idx+1}, ` + insert)).join(',');
  query = `INSERT INTO \`purchaseproduct\` (purchase_id, product_id, price, quantity, \`index\`) VALUES ${purchaseProductInserts}`;
  await do_query(query);
}

// getRecords();
// fixCommasQuotes();
// csvToStoreJson();
// insertBrands();
// csvToJson();
(async function() {
  await connect();
  await insertStores();
  await insertBrands();
  await mapStoresAndBrands();
  await insertProducts();
  await insertStoreProducts();
  await insertUsers();
  await insertPurchases();
  console.log("Done");
})();