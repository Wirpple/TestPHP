const stripe = Stripe('публичный_ключ_API');
const elements = stripe.elements();
const cardElement = elements.create('card');
cardElement.mount('#card-element');

const form = document.getElementById('payment-form');
const submitButton = document.getElementById('submit-button');
// ---------
submitButton.addEventListener('submit', function(event) {
    event.preventDefault();
    stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
    }).then(function(result) {
        if (result.error) {
            console.error(result.error.message);
        } else {
            // Отправка полученного платежного метода на сервер для создания PaymentIntent
            createPaymentIntent(result.paymentMethod.id);
        }
    });
});

function createPaymentIntent(paymentMethodId) {
    fetch('create_payment_intent.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ payment_method_id: paymentMethodId }),
    })
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            handleServerResponse(data);
        });
}

function handleServerResponse(response) {
    if (response.requires_action) {
        stripe.handleCardAction(response.payment_intent_client_secret)
            .then(function(result) {
                if (result.error) {
                    // Ошибка при обработке карты
                    console.error(result.error.message);
                } else {
                    // Отправка полученного платежного метода на сервер для создания PaymentIntent
                    createPaymentIntent(result.paymentMethod.id);
                }
            });
    } else if (response.success) {
        // Платеж успешно завершен
        console.log(response.message);
    } else {
        // Другие ошибки
        console.error(response.message);
    }
}