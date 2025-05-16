#web: cd mi_pagina_web && python manage.py collectstatic --noinput && gunicorn mi_pagina_web.wsgi:application --bind 0.0.0.0:$PORT
web: gunicorn mi_pagina_web.wsgi:application --bind 0.0.0.0:$PORT


