one of the encountered problem is that JWT keep giving me invalid signature error.
After careful investigation, I found out what JWT token do. It is a way to varify whether the front end is a legitimate login.
So why am I sending token to verify whether I am logging in if I am signing up.
I realized I didn't delete the auth token from the login before which has expired since.

Streaming music with subscriptions of GraphQL.

info.context attribute is the HTTPRequest object that would be familiar to any Django developer.

https://www.apollographql.com/blog/understanding-pagination-rest-graphql-and-relay-b10f835549e7/
GraphQL Pagination:

1. offset-based pagination:
   use the numbered offset to decide what data and how many results to return. downside, when new items are inserted, it can display twice, skip vice versa.
2. cursor-based:
   use the cursor to pass the id and get results based on the location.
3. relay-styled cursor:
   relay provides page info. similar to cursor based.

https://medium.com/open-graphql/implementing-search-in-graphql-11d5f71f179
GraphQL search:

1. create AWS appsync
2. create model
3. create searchfield index, to lowercase
4. query data at client end using apollo.
   How to use apollo.
   a. search query based on search field is defined.
   b. query is integrated into reat using compose function.
   c. onChange and data is passed in as props.
   d. onchange function takes in search query and update and reload data on time intervals with debounce.
   e. onChange also has updateQuery field which specify how the stored data should be updated based on the returned results. (similar to pagination).

Django filter to work to Graphene search

CSS knowledge:
difference between align item and align content.
align item: align item on a axis
align content: align multiple different axis.

Django queries:
https://docs.djangoproject.com/en/3.1/topics/db/queries/
create -> save()
read -> .objects modle manager -> .all() , .filter(), .exclude(), returns an array.
filter() methods:

1. exact
2. iexact
3. contains
4. icontains
5. startswith, endswith

lookup spanning relationships can also be achieved.

then retrive with get().

Graphene objects:
Field: Makes a field available on an ObjectType in the GraphQL schema
Arguments will be parsed and provided to resolver methods for fields as keyword arguments.

Apollo Boost query, mutation and subscription:
<Query query={This_query}>
{(loading, error, data) => {}}

the query makes multiple calls, and update the props to the function each time.
in the react component, test what state the query is in, and render it accordingly.

Authentication with GraphQL
use mutation to get email and password and returns the token.
create authLink middeware so that whenever apollo makes a request, the authentication is handled.
<code> link: authLink.concat(httpLink) </code>
authentication token is decoded and verified in the backend and userId deciphered.

Storing JWTs in localStorage is not a safe approach to implement authentication on the frontend. Because this tutorial is focused on GraphQL, we want to keep things simple and therefore are using it here. You can read more about this topic here.
https://www.rdegges.com/2018/please-stop-using-local-storage/

To fix:
make the action instant update.
