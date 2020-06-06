# taxi/routing.py

from django.urls import path # new
from channels.routing import ProtocolTypeRouter, URLRouter # changed

from trips.consumers import TaxiConsumer


application = ProtocolTypeRouter({
    'websocket': URLRouter([
        path('taxi/', TaxiConsumer),
    ]),
})


