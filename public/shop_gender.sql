UPDATE shop.gender SET label = 'male' WHERE id = 1;
UPDATE shop.gender SET label = 'female' WHERE id = 2;
UPDATE shop.oauthtoken SET userId = 252, access_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MDM1MzkwMzQsImV4cCI6MTY5OTQ0MzAzNH0.9WTSPgurDiYiXdMe7hNdiqfuxa2_2Mw0PO3KOYFqEmY', refresh_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MDM1MzkwMzQsImV4cCI6MTY5OTQ0MzAzNH0.MeXCop0ZHIr2g4VjB0pGwTwNHf8L0iS2-9xm2Bn91f8', create_at = '2020-10-24 11:30:34' WHERE id = 106;
UPDATE shop.oauthtoken SET userId = 254, access_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MDM1NTg3NDEsImV4cCI6MTY5OTQ2Mjc0MX0.EcPd8Th3MW5NTz2N5VGhiVTjItB_N0cDnS3U3Lu8V3I', refresh_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MDM1NTg3NDEsImV4cCI6MTY5OTQ2Mjc0MX0.QlbKsf-DhPzgMc9k3f_2I4xXXHCzldDFthylsB2JK_o', create_at = '2020-10-24 16:59:01' WHERE id = 109;
UPDATE shop.oauthtoken SET userId = 252, access_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MDM3MzgwOTgsImV4cCI6MTY5OTY0MjA5OH0.gX1uRgUCEMkzoIxAbjg-VeiKIUw0p4BFStbvnIxI4aA', refresh_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MDM3MzgwOTgsImV4cCI6MTY5OTY0MjA5OH0.YlwYkkw9pSXQCSht_MZxT6-IfBcEDMRxcWHRgmf4WpM', create_at = '2020-10-26 18:48:18' WHERE id = 110;
UPDATE shop.product SET name = 'Піца Маргарита', description = 'Неаполітанський соус, сир моцарела, помідор, базилік
', price = 74, type_id = 1, status_id = 1, size_id = 1, weight = 300, section_id = 7, product_photo = 'products/58/photos/65ea0980-0f02-11eb-ac20-87ec0a53db18.jpg', create_at = '2020-10-15' WHERE productId = 58;
UPDATE shop.product SET name = 'Піца Гавайська', description = 'Неаполітанський соус, сир моцарела, шинка, ананаси консервовані, кукурудза, курка смажена', price = 70, type_id = 1, status_id = 1, size_id = 1, weight = 370, section_id = 7, product_photo = 'products/84/photos/3ccc9730-0f0b-11eb-b28d-ef5f7bb30a77.jpg', create_at = '2020-10-15' WHERE productId = 84;
UPDATE shop.product SET name = 'Піца Галицька', description = 'Неаполітанський соус, сир моцарела, печериці свіжі, синя цибуля, фарш яловичий, часникова олія', price = 84, type_id = 1, status_id = 1, size_id = 1, weight = 300, section_id = 7, product_photo = 'products/122/photos/367b2bb0-13cc-11eb-8b68-7999e2c652a8.jpg', create_at = '2020-10-21' WHERE productId = 122;
UPDATE shop.product SET name = 'Піца з копченою куркою', description = 'Неаполітанський соус, сир моцарела, помідор, печериці свіжі, курка копчена', price = 87, type_id = 1, status_id = 1, size_id = 1, weight = 320, section_id = 7, product_photo = 'products/127/photos/e7efc580-15d5-11eb-977a-e53896d19174.jpg', create_at = '2020-10-24' WHERE productId = 127;
UPDATE shop.product SET name = 'Нігірі з омлетом тамаго', description = 'Рис, кунжут, омлет тамаго, соус унагі, норі', price = 19, type_id = 3, status_id = 1, size_id = 1, weight = 49, section_id = null, product_photo = 'products/136/photos/c8d38aa0-15db-11eb-95db-719060566585.jpg', create_at = '2020-10-24' WHERE productId = 136;
UPDATE shop.product SET name = 'Нігірі з омлетом тамаго123', description = 'Рис, кунжут, омлет тамаго, соус унагі, норі', price = 19, type_id = 3, status_id = 1, size_id = 1, weight = 49, section_id = null, product_photo = 'products/137/photos/55588580-17bb-11eb-921b-f522b61e719e.jpg', create_at = '2020-10-26' WHERE productId = 137;
UPDATE shop.productsection SET section = 'cheese' WHERE id = 4;
UPDATE shop.productsection SET section = 'half' WHERE id = 5;
UPDATE shop.productsection SET section = 'hot' WHERE id = 2;
UPDATE shop.productsection SET section = 'hot_roles' WHERE id = 6;
UPDATE shop.productsection SET section = 'meat' WHERE id = 7;
UPDATE shop.productsection SET section = 'philadelphia' WHERE id = 3;
UPDATE shop.productsection SET section = 'vegetarian' WHERE id = 1;
UPDATE shop.productsize SET size = 22 WHERE id = 1;
UPDATE shop.productsize SET size = 30 WHERE id = 2;
UPDATE shop.productsize SET size = 40 WHERE id = 3;
UPDATE shop.productstatus SET status = 'in_stock' WHERE id = 1;
UPDATE shop.productstatus SET status = 'deleted' WHERE id = 2;
UPDATE shop.producttype SET type = 'chains' WHERE id = 4;
UPDATE shop.producttype SET type = 'desserts' WHERE id = 7;
UPDATE shop.producttype SET type = 'drinks' WHERE id = 8;
UPDATE shop.producttype SET type = 'miso_soups' WHERE id = 5;
UPDATE shop.producttype SET type = 'pizza' WHERE id = 1;
UPDATE shop.producttype SET type = 'roles' WHERE id = 2;
UPDATE shop.producttype SET type = 'salads' WHERE id = 6;
UPDATE shop.producttype SET type = 'supplements' WHERE id = 9;
UPDATE shop.producttype SET type = 'sushi' WHERE id = 3;
UPDATE shop.user SET name = 'JWT_SECRET', surname = '', age = 34, email = 'volodimirperun007a@gmail.com', password = '$2b$10$mXhRVFk.saPtOev75qQlLuSFLwhbRbYhOEIonfCgXmwfkGdH8vao.', phone = 0, gender_id = null, status_id = null, role_id = null, postOfficeLocation = '', address = '', city = '', user_photo = null, create_at = '2020-01-01 00:00:00' WHERE userId = 2;
UPDATE shop.user SET name = 'JWT_REFRESH_SECRET', surname = '', age = 34, email = 'volodimirperun777@ukr.net', password = '$2b$10$m6z7akGidsLTGt5hFcIKJuPIaseru7aQNnsZ1rDdw.OMtHkHXNjFq', phone = 0, gender_id = null, status_id = null, role_id = null, postOfficeLocation = '', address = '', city = '', user_photo = null, create_at = '2020-01-01 01:01:01' WHERE userId = 7;
UPDATE shop.user SET name = 'Євген', surname = 'Дракон', age = 33, email = 'volodimirperun007@ukr.net', password = '$2b$10$ryuyGnjOD7axlInMv8gdW.z18PC08wkbNc93rdv/oANlH7GSEEb6.', phone = 978887352, gender_id = 1, status_id = 1, role_id = 1, postOfficeLocation = 'вул.Лімба, буд.2', address = 'вул.Зимна, буд.12', city = 'Ужгород', user_photo = 'users/252/photos/09d49070-13c6-11eb-a259-2b6f021cb7ad.jpg', create_at = '2020-10-21 17:56:52' WHERE userId = 252;
UPDATE shop.user SET name = 'Benjamin', surname = 'Franklin', age = 99, email = 'volodimirperun007m@ukr.net', password = '$2b$10$c24QRj5W99EMsbmwrgjXHOXWG7FAqQyPQun5ryYApEydq.gS80J8W', phone = 979765432, gender_id = 1, status_id = 1, role_id = 2, postOfficeLocation = 'Someware', address = 'Wall Street, 1', city = 'New York', user_photo = 'users/254/photos/499a0c70-15f7-11eb-889c-b308b6e5681e.png', create_at = '2020-10-24 13:01:10' WHERE userId = 254;
UPDATE shop.userrole SET label = 'Admin' WHERE id = 1;
UPDATE shop.userrole SET label = 'Client' WHERE id = 2;
UPDATE shop.userrole SET label = 'Seller' WHERE id = 3;
UPDATE shop.userstatus SET label = 'active' WHERE id = 1;
UPDATE shop.userstatus SET label = 'blocked' WHERE id = 2;
UPDATE shop.userstatus SET label = 'deleted' WHERE id = 3;