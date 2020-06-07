# taxi/routing.py

from django.urls import path  # new
from channels.routing import ProtocolTypeRouter, URLRouter  # changed

from taxi.middleware import TokenAuthMiddlewareStack
from trips.consumers import TaxiConsumer


application = ProtocolTypeRouter(
    {"websocket": TokenAuthMiddlewareStack(URLRouter([path("taxi/", TaxiConsumer),])),}
)
