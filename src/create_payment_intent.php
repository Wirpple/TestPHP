<?php
// Подключение библиотеки Stripe PHP
require 'vendor/autoload.php';

// Установка секретного ключа API Stripe
\Stripe\Stripe::setApiKey('секретный_ключ_API');

try {
    // Получение данных от клиента (например, id платежного метода)
    $requestData = json_decode(file_get_contents('php://input'), true);

    // Создаем платежный интент с указанием требования 3D Secure (SCA)
    $paymentIntent = \Stripe\PaymentIntent::create([
        'amount' => 1000, // Сумма в минимальных единицах валюты (например, копейки)
        'currency' => 'usd',
        'payment_method' => $requestData['payment_method_id'],
        'confirmation_method' => 'manual',
        'confirm' => true,
        'use_stripe_sdk' => ['3d_secure' => 'required'],
    ]);

    // Обработка результата
    if ($paymentIntent->status == 'requires_action' &&
        $paymentIntent->next_action->type == 'use_stripe_sdk') {
        echo json_encode(['requires_action' => true, 'payment_intent_client_secret' => $paymentIntent->client_secret]);
    } else if ($paymentIntent->status == 'succeeded') {
        // Сохраняем детали транзакции в базе данных
        // ...

        echo json_encode(['success' => true, 'message' => 'Платеж успешно завершен']);
    } else {
        echo json_encode(['error' => true, 'message' => 'Не удалось завершить платеж']);
    }
} catch (Exception $e) {
    echo json_encode(['error' => true, 'message' => $e->getMessage()]);
}