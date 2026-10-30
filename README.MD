# Notification Service

Notification Service (default port `3002`) consumes booking confirmation messages from RabbitMQ queue `noti-queue` and sends email using Nodemailer. Its HTTP API separately creates notification ticket records. It does not own booking state or payment state; Booking Service remains the source of truth for those workflows.

## Routes and queue behavior

- `POST /api/v1/tickets`: create a ticket record; this endpoint does not send the queued booking confirmation email.
- Queue message fields: `recepientEmail`, `subject`, and `text`. Booking Service sets the recipient to the first passenger's email address.

The queue consumer acknowledges a message after email sending succeeds. Its callback has no explicit per-message error handler, retry policy, dead-letter queue, or persisted delivery status. Broker redelivery behavior is not guaranteed by this application code. Treat email delivery as asynchronous and do not use this service's ticket record as proof that a booking or payment succeeded.

## Run

Configure `PORT`, `GMAIL_EMAIL`, `GMAIL_PASS`, the notification database, and `RABBITMQ_URL` (defaults to `amqp://localhost`). Use the same broker URL in Booking Service. Apply Sequelize migrations and run `npm run dev`. Keep mail credentials in local configuration, not source control.
