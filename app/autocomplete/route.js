import { Client } from "@elastic/elasticsearch";
import { NextResponse } from 'next/server';
const fs = require('fs')
// Return data from elasticsearch
export async function GET(req, res) {
  const searchParams = req.nextUrl.searchParams
  const query = searchParams.get('query')

  console.log(query)
  const client = new Client({
    node: 'https://localhost:9200',
    auth: {
      username: 'elastic',
      password: 'c6a+bIk6D3t*V9LfJWzg'
    },
    tls: {
      ca: fs.readFileSync('http_ca.crt'),
      rejectUnauthorized: false
    }
  })

  res = await client.search({
    index: 'space_data',
    size: 6,
    query: {
      more_like_this: {
        fields: [
          "topic",
          "description",
        ],
        like: query,
        min_term_freq: 1,
        max_query_terms: 24,
      },
    },
  })

  return NextResponse.json(
      res.hits.hits.map((hit) => ({
        ...hit._source,
      }))
    );
};