// @flow

export type Event = {
  id: string,
  occurred: Date,
  type: string,
  topic: string,
  aggregateId: string,
  causationId: string,
  correlationId: string,
  payload: {},
};

function compare(a: Event, b: Event): number {
  return a.occurred.getTime() - b.occurred.getTime()
}

export const events: Event[] = [
  {
    id: '66dad68c-c462-4bef-a9a3-8aaa1f344b9d',
    occurred: new Date(Date.parse('2019-09-10T14:00:00')),
    type: 'command',
    topic: 'com.example.command_1',
    aggregateId: 'a64d53ce-c53f-4fdc-9d3f-03f07b754b2c',
    causationId: '66dad68c-c462-4bef-a9a3-8aaa1f344b9d',
    correlationId: '66dad68c-c462-4bef-a9a3-8aaa1f344b9d',
    payload: {},
  },
  {
    id: 'b01ddce6-2187-418d-b25b-e67c12ee777a',
    occurred: new Date(Date.parse('2019-09-10T14:00:01')),
    type: 'event',
    topic: 'com.example.event_1',
    aggregateId: 'a64d53ce-c53f-4fdc-9d3f-03f07b754b2c',
    causationId: '66dad68c-c462-4bef-a9a3-8aaa1f344b9d',
    correlationId: '66dad68c-c462-4bef-a9a3-8aaa1f344b9d',
    payload: {},
  },
  {
    id: '57dae5e5-487f-4ebc-a7fd-78751282c049',
    occurred: new Date(Date.parse('2019-09-10T14:00:02')),
    type: 'event',
    topic: 'com.example.event_2',
    aggregateId: 'a64d53ce-c53f-4fdc-9d3f-03f07b754b2c',
    causationId: 'b01ddce6-2187-418d-b25b-e67c12ee777a',
    correlationId: '66dad68c-c462-4bef-a9a3-8aaa1f344b9d',
    payload: {},
  },
  {
    id: 'e76bff0e-398f-4e37-82fa-ba3066adecdf',
    occurred: new Date(Date.parse('2019-09-10T14:00:03')),
    type: 'event',
    topic: 'com.example.event_3',
    aggregateId: 'a64d53ce-c53f-4fdc-9d3f-03f07b754b2c',
    causationId: '57dae5e5-487f-4ebc-a7fd-78751282c049',
    correlationId: '66dad68c-c462-4bef-a9a3-8aaa1f344b9d',
    payload: {},
  },
  {
    id: '826535fd-7cc0-435e-80a3-e304ad5959a0',
    occurred: new Date(Date.parse('2019-09-10T14:00:04')),
    type: 'event',
    topic: 'com.example.event_4',
    aggregateId: 'a64d53ce-c53f-4fdc-9d3f-03f07b754b2c',
    causationId: 'e76bff0e-398f-4e37-82fa-ba3066adecdf',
    correlationId: '66dad68c-c462-4bef-a9a3-8aaa1f344b9d',
    payload: {},
  },
].sort(compare);
