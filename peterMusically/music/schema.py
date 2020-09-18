import graphene
from graphene_django import DjangoObjectType
from graphql import GraphQLError
from django.db.models import Q

from .models import Music
from user.schema import UserType

class MusicType(DjangoObjectType):
    class Meta:
        model = Music

class Query(graphene.ObjectType):
    music = graphene.List(MusicType, search = graphene.String())

    def resolve_music(self, info, search=None):
        if search:
            filters = (
                Q(title__icontains=search)|
                Q(description__icontains=search)|
                Q(hashtag__icontains=search)|
                Q(url__icontains=search)|
                Q(owner__icontains=search)
            )
            return Music.objects.filter(filters)

        return Music.objects.limit(10).all()

class CreateTrack(graphene.Mutation):
    track = graphene.Field(MusicType)

    class Arguments:
        title = graphene.String()
        description = graphene.String()
        hashtag = graphene.String()
        url = graphene.String()

    def mutate(self, info, title, description, url, hashtag):
        # user = info.context.user

        # if user.is_anonymous:
        #     raise GraphQLError("Please logon")

        music = Music(title=title, description=description, url=url, hashtag=hashtag)       
        music.save()
        return CreateTrack(track=music)


class Mutation(graphene.ObjectType):
    create_track = CreateTrack.Field()