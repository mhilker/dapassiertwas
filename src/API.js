import type { Event } from './Events'

type HistoryRequest = {};

type HistoryResponse = {
  events: Event[],
};

export async function loadHistory(request: HistoryRequest): HistoryResponse
{
  const url = 'http://localhost:22000/history';
  const response = await fetch(url, {
    method: 'GET',
  });

  const data = await response.json();

  return {
    events: data.events.map((event) => {
      return {
        id: event.id,
        occurred: new Date(Date.parse(event.occurred_on)),
        type: 'event',
        topic: event.topic,
        aggregateId: event.aggregate_id,
        causationId: event.causation_id,
        correlationId: event.correlation_id,
        payload: event.payload,
      };
    })
  };
}

export type Bucket = {
  id: string,
  count: number,
  date: Date,
};

type BucketRequest = {};

type BucketResponse = {
  buckets: Bucket[],
};

export async function loadBuckets(request: BucketRequest): BucketResponse
{
  const url = 'http://localhost:22000/buckets';
  const response = await fetch(url, {
    method: 'GET',
  });

  const data = await response.json();

  const buckets = data.buckets.map((bucket) => {
    return {
      id: bucket.id,
      count: bucket.count,
      date: new Date(Date.parse(bucket.id)),
    };
  });

  return {
    buckets: buckets,
  };
}
