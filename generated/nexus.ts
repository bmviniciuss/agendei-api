/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import type { core } from "nexus"
declare global {
  interface NexusGenCustomInputMethods<TypeName extends string> {
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    date<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "DateTime";
  }
}
declare global {
  interface NexusGenCustomOutputMethods<TypeName extends string> {
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    date<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "DateTime";
  }
}


declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  CancelTicketInput: { // input type
    ticketId: string; // ID!
  }
  CreateEventInput: { // input type
    eventDetails: NexusGenInputs['CreateEvent_EventDetailsInput']; // CreateEvent_EventDetailsInput!
    rule: string; // String!
    spaceId: string; // ID!
  }
  CreateEvent_EventDetailsInput: { // input type
    description: string; // String!
    duration: number; // Float!
    slots: number; // Int!
    title: string; // String!
  }
  CreateSpaceInput: { // input type
    clientsPerSlot: number; // Int!
    description: string; // String!
    name: string; // String!
    ruleSet: NexusGenInputs['CreateSpace_RuleSetInput']; // CreateSpace_RuleSetInput!
  }
  CreateSpace_RuleSetInput: { // input type
    limit: number; // Int!
    type: NexusGenEnums['RuleSetTypeEnum']; // RuleSetTypeEnum!
  }
  GetOccurrencesInput: { // input type
    endTime: NexusGenScalars['DateTime']; // DateTime!
    spaceIds?: string[] | null; // [String!]
    startTime: NexusGenScalars['DateTime']; // DateTime!
  }
  GetSpaceEventsInput: { // input type
    spaceId: string; // ID!
  }
  LoginUserInput: { // input type
    email: string; // String!
    password: string; // String!
  }
  MakeReservationInput: { // input type
    date: NexusGenScalars['DateTime']; // DateTime!
    parentId: string; // ID!
  }
  RegisterUserInput: { // input type
    email: string; // String!
    name: string; // String!
    password: string; // String!
    passwordConfirmation: string; // String!
  }
}

export interface NexusGenEnums {
  EventTypeEnum: "BOOKED" | "CANCELED" | "EVENT" | "EXCEPTION" | "OCCURRENCE"
  RuleSetTypeEnum: "DAILY" | "MONTHLY" | "WEEKLY"
  TicketStatus: "CANCELED" | "RESERVED" | "USED"
  UserType: "ADMIN" | "CLIENT"
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
  DateTime: any
}

export interface NexusGenObjects {
  Event: { // root type
    active?: boolean | null; // Boolean
    createdAt?: NexusGenScalars['DateTime'] | null; // DateTime
    id: string; // ID!
    rule: string; // String!
    updatedAt?: NexusGenScalars['DateTime'] | null; // DateTime
  }
  EventDetails: { // root type
    active?: boolean | null; // Boolean
    createdAt?: NexusGenScalars['DateTime'] | null; // DateTime
    description?: string | null; // String
    duration?: number | null; // Float
    id: string; // ID!
    slots?: number | null; // Int
    title?: string | null; // String
    type: NexusGenEnums['EventTypeEnum']; // EventTypeEnum!
    updatedAt?: NexusGenScalars['DateTime'] | null; // DateTime
  }
  EventInstance: { // root type
    active?: boolean | null; // Boolean
    createdAt?: NexusGenScalars['DateTime'] | null; // DateTime
    date: NexusGenScalars['DateTime']; // DateTime!
    id: string; // ID!
    isCanceled?: boolean | null; // Boolean
    isRescheduled?: boolean | null; // Boolean
    updatedAt?: NexusGenScalars['DateTime'] | null; // DateTime
  }
  LoginUserResult: { // root type
    accessToken: string; // String!
    user: NexusGenRootTypes['User']; // User!
  }
  Mutation: {};
  Occurrence: { // root type
    active?: boolean | null; // Boolean
    createdAt?: NexusGenScalars['DateTime'] | null; // DateTime
    date: NexusGenScalars['DateTime']; // DateTime!
    description?: string | null; // String
    duration?: number | null; // Float
    id: string; // ID!
    isCanceled: boolean; // Boolean!
    isParentEvent: boolean; // Boolean!
    isRescheduled: boolean; // Boolean!
    parentId: string; // ID!
    slots: number; // Int!
    title?: string | null; // String
    type: NexusGenEnums['EventTypeEnum']; // EventTypeEnum!
    updatedAt?: NexusGenScalars['DateTime'] | null; // DateTime
  }
  Query: {};
  Space: { // root type
    active: boolean; // Boolean!
    clientsPerSlot: number; // Int!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    description: string; // String!
    id: string; // ID!
    name: string; // String!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
  SpaceRuleSet: { // root type
    active: boolean; // Boolean!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: string; // ID!
    limit: number; // Int!
    type: NexusGenEnums['RuleSetTypeEnum']; // RuleSetTypeEnum!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
  Ticket: { // root type
    active: boolean; // Boolean!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: string; // ID!
    status: NexusGenEnums['TicketStatus']; // TicketStatus!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
  User: { // root type
    active: boolean; // Boolean!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    email: string; // String!
    id: string; // ID!
    name: string; // String!
    type: NexusGenEnums['UserType']; // UserType!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars & NexusGenEnums

export interface NexusGenFieldTypes {
  Event: { // field return type
    active: boolean | null; // Boolean
    createdAt: NexusGenScalars['DateTime'] | null; // DateTime
    eventDetails: NexusGenRootTypes['EventDetails'] | null; // EventDetails
    id: string; // ID!
    rule: string; // String!
    updatedAt: NexusGenScalars['DateTime'] | null; // DateTime
  }
  EventDetails: { // field return type
    active: boolean | null; // Boolean
    createdAt: NexusGenScalars['DateTime'] | null; // DateTime
    description: string | null; // String
    duration: number | null; // Float
    id: string; // ID!
    slots: number | null; // Int
    title: string | null; // String
    type: NexusGenEnums['EventTypeEnum']; // EventTypeEnum!
    updatedAt: NexusGenScalars['DateTime'] | null; // DateTime
  }
  EventInstance: { // field return type
    active: boolean | null; // Boolean
    createdAt: NexusGenScalars['DateTime'] | null; // DateTime
    date: NexusGenScalars['DateTime']; // DateTime!
    eventDetails: NexusGenRootTypes['EventDetails'] | null; // EventDetails
    id: string; // ID!
    isCanceled: boolean | null; // Boolean
    isPastDate: boolean | null; // Boolean
    isRescheduled: boolean | null; // Boolean
    parent: NexusGenRootTypes['Event'] | null; // Event
    updatedAt: NexusGenScalars['DateTime'] | null; // DateTime
  }
  LoginUserResult: { // field return type
    accessToken: string; // String!
    user: NexusGenRootTypes['User']; // User!
  }
  Mutation: { // field return type
    CancelTicket: NexusGenRootTypes['Ticket'] | null; // Ticket
    CreateEvent: NexusGenRootTypes['Event'] | null; // Event
    CreateSpace: NexusGenRootTypes['Space'] | null; // Space
    LoginUser: NexusGenRootTypes['LoginUserResult'] | null; // LoginUserResult
    LogoutUser: boolean | null; // Boolean
    MakeReservation: NexusGenRootTypes['Ticket'] | null; // Ticket
    RegisterUser: NexusGenRootTypes['User'] | null; // User
  }
  Occurrence: { // field return type
    active: boolean | null; // Boolean
    availableSlots: number; // Int!
    createdAt: NexusGenScalars['DateTime'] | null; // DateTime
    date: NexusGenScalars['DateTime']; // DateTime!
    description: string | null; // String
    duration: number | null; // Float
    id: string; // ID!
    isCanceled: boolean; // Boolean!
    isFull: boolean | null; // Boolean
    isParentEvent: boolean; // Boolean!
    isRescheduled: boolean; // Boolean!
    parentId: string; // ID!
    slots: number; // Int!
    title: string | null; // String
    type: NexusGenEnums['EventTypeEnum']; // EventTypeEnum!
    updatedAt: NexusGenScalars['DateTime'] | null; // DateTime
    userHasActiveReservedTicket: boolean | null; // Boolean
    userReservedTickets: Array<NexusGenRootTypes['Ticket'] | null>; // [Ticket]!
  }
  Query: { // field return type
    GetOccurences: NexusGenRootTypes['Occurrence'][] | null; // [Occurrence!]
    GetSpaceEvents: NexusGenRootTypes['Event'][] | null; // [Event!]
    GetSpaces: NexusGenRootTypes['Space'][] | null; // [Space!]
    GetUserTickets: NexusGenRootTypes['Ticket'][] | null; // [Ticket!]
    Space: NexusGenRootTypes['Space'] | null; // Space
    me: NexusGenRootTypes['User'] | null; // User
  }
  Space: { // field return type
    active: boolean; // Boolean!
    clientsPerSlot: number; // Int!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    description: string; // String!
    events: NexusGenRootTypes['Event'][] | null; // [Event!]
    id: string; // ID!
    name: string; // String!
    occurrences: NexusGenRootTypes['Occurrence'][] | null; // [Occurrence!]
    ruleSet: NexusGenRootTypes['SpaceRuleSet'] | null; // SpaceRuleSet
    tickets: NexusGenRootTypes['Ticket'][] | null; // [Ticket!]
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
  SpaceRuleSet: { // field return type
    active: boolean; // Boolean!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: string; // ID!
    limit: number; // Int!
    type: NexusGenEnums['RuleSetTypeEnum']; // RuleSetTypeEnum!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
  Ticket: { // field return type
    active: boolean; // Boolean!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    eventInstance: NexusGenRootTypes['EventInstance'] | null; // EventInstance
    id: string; // ID!
    status: NexusGenEnums['TicketStatus']; // TicketStatus!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
    user: NexusGenRootTypes['User']; // User!
  }
  User: { // field return type
    active: boolean; // Boolean!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    email: string; // String!
    id: string; // ID!
    name: string; // String!
    type: NexusGenEnums['UserType']; // UserType!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
}

export interface NexusGenFieldTypeNames {
  Event: { // field return type name
    active: 'Boolean'
    createdAt: 'DateTime'
    eventDetails: 'EventDetails'
    id: 'ID'
    rule: 'String'
    updatedAt: 'DateTime'
  }
  EventDetails: { // field return type name
    active: 'Boolean'
    createdAt: 'DateTime'
    description: 'String'
    duration: 'Float'
    id: 'ID'
    slots: 'Int'
    title: 'String'
    type: 'EventTypeEnum'
    updatedAt: 'DateTime'
  }
  EventInstance: { // field return type name
    active: 'Boolean'
    createdAt: 'DateTime'
    date: 'DateTime'
    eventDetails: 'EventDetails'
    id: 'ID'
    isCanceled: 'Boolean'
    isPastDate: 'Boolean'
    isRescheduled: 'Boolean'
    parent: 'Event'
    updatedAt: 'DateTime'
  }
  LoginUserResult: { // field return type name
    accessToken: 'String'
    user: 'User'
  }
  Mutation: { // field return type name
    CancelTicket: 'Ticket'
    CreateEvent: 'Event'
    CreateSpace: 'Space'
    LoginUser: 'LoginUserResult'
    LogoutUser: 'Boolean'
    MakeReservation: 'Ticket'
    RegisterUser: 'User'
  }
  Occurrence: { // field return type name
    active: 'Boolean'
    availableSlots: 'Int'
    createdAt: 'DateTime'
    date: 'DateTime'
    description: 'String'
    duration: 'Float'
    id: 'ID'
    isCanceled: 'Boolean'
    isFull: 'Boolean'
    isParentEvent: 'Boolean'
    isRescheduled: 'Boolean'
    parentId: 'ID'
    slots: 'Int'
    title: 'String'
    type: 'EventTypeEnum'
    updatedAt: 'DateTime'
    userHasActiveReservedTicket: 'Boolean'
    userReservedTickets: 'Ticket'
  }
  Query: { // field return type name
    GetOccurences: 'Occurrence'
    GetSpaceEvents: 'Event'
    GetSpaces: 'Space'
    GetUserTickets: 'Ticket'
    Space: 'Space'
    me: 'User'
  }
  Space: { // field return type name
    active: 'Boolean'
    clientsPerSlot: 'Int'
    createdAt: 'DateTime'
    description: 'String'
    events: 'Event'
    id: 'ID'
    name: 'String'
    occurrences: 'Occurrence'
    ruleSet: 'SpaceRuleSet'
    tickets: 'Ticket'
    updatedAt: 'DateTime'
  }
  SpaceRuleSet: { // field return type name
    active: 'Boolean'
    createdAt: 'DateTime'
    id: 'ID'
    limit: 'Int'
    type: 'RuleSetTypeEnum'
    updatedAt: 'DateTime'
  }
  Ticket: { // field return type name
    active: 'Boolean'
    createdAt: 'DateTime'
    eventInstance: 'EventInstance'
    id: 'ID'
    status: 'TicketStatus'
    updatedAt: 'DateTime'
    user: 'User'
  }
  User: { // field return type name
    active: 'Boolean'
    createdAt: 'DateTime'
    email: 'String'
    id: 'ID'
    name: 'String'
    type: 'UserType'
    updatedAt: 'DateTime'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    CancelTicket: { // args
      input: NexusGenInputs['CancelTicketInput']; // CancelTicketInput!
    }
    CreateEvent: { // args
      input: NexusGenInputs['CreateEventInput']; // CreateEventInput!
    }
    CreateSpace: { // args
      input: NexusGenInputs['CreateSpaceInput']; // CreateSpaceInput!
    }
    LoginUser: { // args
      input: NexusGenInputs['LoginUserInput']; // LoginUserInput!
    }
    MakeReservation: { // args
      input: NexusGenInputs['MakeReservationInput']; // MakeReservationInput!
    }
    RegisterUser: { // args
      input: NexusGenInputs['RegisterUserInput']; // RegisterUserInput!
    }
  }
  Query: {
    GetOccurences: { // args
      input: NexusGenInputs['GetOccurrencesInput']; // GetOccurrencesInput!
    }
    GetSpaceEvents: { // args
      input: NexusGenInputs['GetSpaceEventsInput']; // GetSpaceEventsInput!
    }
    Space: { // args
      spaceId: string; // ID!
    }
  }
  Space: {
    occurrences: { // args
      occurrencesInput: NexusGenInputs['GetOccurrencesInput']; // GetOccurrencesInput!
    }
    tickets: { // args
      take?: number | null; // Int
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = keyof NexusGenInputs;

export type NexusGenEnumNames = keyof NexusGenEnums;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: any;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}