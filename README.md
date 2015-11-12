# rosebank-logger

A centralised logging application.

## Required Environment Variables

Environment Variable     | Explanation
-------------------------|------------
ROSEBANK_LOGGER_DB       | Name of RethinkDB database that will contain the logging tables
ROSEBANK_DATASTORE_HOST  | `rosebank-datastore` server hostname
ROSEBANK_DATASTORE_PORT  | `rosebank-datastore` server port
ROSEBANK_LOGGER_HTTPPORT | Hapi server port