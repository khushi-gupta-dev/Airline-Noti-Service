# Notification Service

Consumes JSON confirmation messages from RabbitMQ queue `noti-queue` and emails the supplied `recepientEmail` using Nodemailer. The current queue consumer does not store notification tickets or maintain delivery statuses; failed messages are logged and no retry/dead-letter policy is configured.

The HTTP API exposes the ticket routes under `/api/v1`; it is separate from the booking confirmation consumer.

## Run

Configure `PORT`, `GMAIL_EMAIL`, `GMAIL_PASS`, the MySQL database, and RabbitMQ at `amqp://localhost`. Apply migrations, then run `npm run dev` (default port 3002).
