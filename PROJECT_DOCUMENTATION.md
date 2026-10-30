# Notification Service Documentation

Notification Service consumes booking-confirmation messages from RabbitMQ and
sends email with Nodemailer. It also exposes a small notification-ticket API.
It does not own booking, payment, or recovery state.

## Runtime

- Default port: `3002`
- Start: `npm run dev`
- Database: notification ticket database
- Broker: `RABBITMQ_URL=amqp://localhost:5672`
- Queue: `noti-queue`

## HTTP API

- `POST /api/v1/tickets` — create a notification ticket record.
- `GET /` — health response.

Ticket creation does not itself send the booking email. Booking Service
publishes a message containing `recepientEmail`, `subject`, and `text`.

## Consumer behavior

The consumer acknowledges a message after Nodemailer succeeds. The current
application does not implement a per-message retry policy, dead-letter queue,
or persisted delivery status. Treat email delivery as asynchronous and never
use a ticket record as proof of payment or booking success.

## Configuration

Configure `PORT`, `GMAIL_EMAIL`, `GMAIL_PASS`, database settings, and
`RABBITMQ_URL`. Apply Sequelize migrations before starting. Keep mail
credentials out of source control.
