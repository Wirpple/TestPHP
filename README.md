# Тестовое задание PHP от МАЙСТРИМ

Задача: Интегрировать платежную систему как кастомную интеграцию (php framework любой).
Пояснение: детально описать (насколько возможно) как интегрировать платежную систему Stripe с рекуррентными платежами. PHP фреймворк - любой. 
Регистрация Stripe Sandbox аккаунта для тестирования доступна для всех, на произвольный email (для выполнения тестового задания sandbox и тестовых карт достаточно).

Интегрируем платежную систему как кастомную интеграцию (примеры интеграции Stripe есть и в стандартном Marketplace практически любой CMS/Framework, но в нашем случае создаем свою интеграцию) не установку из Marketplace, для дальнейшей кастомизации.
Если в задании не указан стек, который необходимо использовать в подзадачах и Вы в чем-то сомневаетесь - лучше связаться с HR.

Формат сдачи:
1. Исходный код должен быть залит на github.com (не использовать файловые обменники).
2. Если используете регистрацию пользователя, она должна быть реализована после оплаты.
3. Логику выполнения задания желательно отобразить в гуглдокументе. 

Пункты, которые должны быть реализованы для сдачи проекта:
1. Обработка ошибок оплаты (фиксация статусов платежей при получении webhook)
2. Обработка дубликатов оплат (дубликаты одинаковых сообщений со стороны стороны stripe и др.), указать по какому критерию проверяются дубликаты (метаданные, номера заказов, id клиента, номера транзакций или др.).
3. Webhook - его не нужно создавать самим, stripe сам отправляет, с тестового аккаунта можно отправлять сколько угодно webhook, любых видов. 
Задача по webhook - получать их, и обрабатывать статус подписки (внутренний) с учетом статусов и payload из них.
4. Менеджмент подписок - дата следующего платежа, до какого числа действует, дата отписки и др. (sql table, php webhook) 
5. Код интеграции формы stripe должен включать подписку (если нет - довести до конца)
6. Менеджмент платежей (sql) - отображение платежей по этим подпискам, как успешные так и failed
7. Возможность провести оплату тестовой картой 4242 (платежная форма stripe, а не сохранение карты в профиль).

Логика тестового задания, что делаем в общих чертах:
1. Интеграция кастомная (не через Marketplace) т.е. с получением id пользователя, платежного средства и т.д. (для sandbox это все так же работает).
2. Интеграция платежной формы (не хардкод тестовой карты) с получением webhook и проверкой статусов оплат. Полноценная интеграция для любого пользователя (пусть и оплачивающего тестовой картой в sandbox).
3. Черновик таблиц (либо пояснение) в SQL базе данных в котором будут храниться как первые оплаты, так и рекуррентные платежи (подписки).
4. Логика отмены подписки для пользователя (обращение support, запрос через api - какие поля нужны будут для этого, либо автоматическая отмена по cron - по каким критериям). Желательно с примерами, но можно и пояснить словами.
5. Минимальное описание выполненной интеграции и готовность пояснить в случае необходимости все особенности интеграции на очной встрече.

Примерный план выполнения задания для демонстрации процесса интеграции платежного шлюза Stripe:
создать HTML-форму для сбора информации о кредитной карте;
создать PaymentIntent, используя PHP-библиотеку Stripe;
прикрепить элементы ввода карты к HTML-форме с помощью библиотеки Stripe JS;
безопасно передавать данные карты, проверять, снимать и подтверждать платежи с помощью Stripe API;
получать PaymentIntent и информацию о клиенте с помощью Stripe API;
вставить детали транзакции в базу данных и отобразить статус платежа;
интегрировать платежи 3D Secure для поддержки строгой аутентификации клиентов (SCA).
