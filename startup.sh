

curl -XPOST "http://localhost:8080/2015-03-31/functions/function/invocations" -d '{"Records": [{"s3": {"object": {"key":"init(alice).init(bob).init(carol)."}}}]}'
