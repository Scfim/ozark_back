-- CREATE DATABASE
DROP database if EXISTS ozark;
CREATE DATABASE IF NOT EXISTS ozark;
USE ozark;

-- CREATE TABLE ETABLISHEMENT
CREATE TABLE IF NOT EXISTS etablishement(
	etablishement_name VARCHAR(100) NOT NULL DEFAULT "COORPORATION",
    etablishement_mail VARCHAR(256),
    etablishement_phone_number VARCHAR(13) NOT NULL DEFAULT "+243000000000",
    etablishement_web_site VARCHAR(100),
    etablishement_logo VARCHAR(256) NOT NULL DEFAULT "logo.png",
    etablishement_bp VARCHAR(10),
    etablishment_adress VARCHAR(256),
    system_date DATE NOT NULL,
    system_time TIME NOT NULL
);

-- CREATE TABLE USER
CREATE TABLE IF NOT EXISTS users(
	user_id VARCHAR(256) PRIMARY KEY NOT NULL,
    user_first_name VARCHAR(30) NOT NULL,
    user_last_name VARCHAR(30) NOT NULL,
    user_phone_number VARCHAR(13) NOT NULL,
    user_mail_adress VARCHAR(100) NULL,
    user_type VARCHAR(30)  NOT NULL,
    user_pass_word VARCHAR(256),
    user_image varchar(100),
    system_date DATE NOT NULL,
    system_time TIME NOT NULL,
    user_admin_id VARCHAR(256)
);
-- CREATE TABLE PROVIDEER
CREATE TABLE IF NOT EXISTS providers(
	provider_id VARCHAR(256) PRIMARY KEY NOT NULL,
    provider_name VARCHAR(100) NOT NULL,
    provider_adress VARCHAR(256) NULL,
    provider_phone_number  VARCHAR(13)NOT NULL,
    provider_mail_adress VARCHAR(100) NULL,
    system_date DATE NOT NULL,
    system_time TIME NOT NULL,
    user_id VARCHAR(256),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
    
);
-- CREATE TABLE CLIENTS
CREATE TABLE IF NOT EXISTS clients(
	client_id VARCHAR(256) PRIMARY KEY NOT NULL,
    client_name VARCHAR(100) NOT NULL,
    client_adress VARCHAR(256) NULL,
    client_phone_number  VARCHAR(13)NOT NULL,
    client_mail_adress VARCHAR(100) NULL,
    system_date DATE NOT NULL,
    system_time TIME NOT NULL,
    user_id VARCHAR(256),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
    
);
-- CREATE TABLE EXERCISES
CREATE TABLE IF NOT EXISTS exercises(
	exercise_id VARCHAR(256) PRIMARY KEY NOT NULL,
    exercise_start_date DATE NOT NULL,
    exercise_end_date DATE NOT NULL,
    exercise_status  TINYINT DEFAULT 1,
    system_date DATE NOT NULL,
    system_time TIME NOT NULL,
    user_id VARCHAR(256),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- CREATE TABLE CATEGORIES
CREATE TABLE IF NOT EXISTS categories(
	categorie_id VARCHAR(256) PRIMARY KEY NOT NULL,    
	categorie_name VARCHAR(100) NOT NULL,
    categorie_type VARCHAR(20) NOT NULL,
    system_date DATE NOT NULL,
    system_time TIME NOT NULL,
    user_id VARCHAR(256),    
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
-- CREATE TABLE SUB  CATEGORIES
CREATE TABLE IF NOT EXISTS sub_categories(
	sub_categorie_id VARCHAR(256) PRIMARY KEY NOT NULL,
    categorie_id VARCHAR(256),
	sub_categorie_name VARCHAR(100) NOT NULL,
    sub_categorie_type VARCHAR(20) NOT NULL,
    system_date DATE NOT NULL,
    system_time TIME NOT NULL,
    user_id VARCHAR(256),    
    FOREIGN KEY (categorie_id) REFERENCES categories(categorie_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
-- CREATE TABLE MARQUE
CREATE TABLE IF NOT EXISTS marks (
	mark_id VARCHAR(256) PRIMARY KEY NOT NULL,
    sub_categorie_id VARCHAR(256),
    mark_name VARCHAR(100) NOT NULL,
    mark_description TEXT,
    system_date DATE NOT NULL,
    system_time TIME NOT NULL,
    user_id VARCHAR(256),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
	FOREIGN KEY (sub_categorie_id) REFERENCES sub_categories(sub_categorie_id)    
);
-- CREATE TABLE PRODUCTS
CREATE TABLE IF NOT EXISTS products(
	product_id VARCHAR(256) PRIMARY KEY NOT NULL,
	mark_id VARCHAR(256) NOT NULL,     
	product_name VARCHAR(100) NOT NULL,
	product_marque VARCHAR(100) NULL,
	product_dosage VARCHAR(20) NULL,
	product_forme VARCHAR(50) NULL,
	product_format VARCHAR(50) NULL,
	product_alert_stock DOUBLE NULL,
    system_date DATE NOT NULL,
    system_time TIME NOT NULL,
    user_id VARCHAR(256),   
    FOREIGN KEY (mark_id) REFERENCES marks(mark_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- CREATE TABLE INPUT TRAFFIC
CREATE TABLE IF NOT EXISTS input_traffic(
	input_traffic_id VARCHAR(256) PRIMARY KEY NOT NULL,
	provider_id VARCHAR(256) NOT NULL,
    product_id VARCHAR(256) NOT NULL,
    quantity DOUBLE NOT NULL,
    unite_price DOUBLE NOT NULL,
    lot_number VARCHAR(30),
    expire_date DATE,
    exercise_id VARCHAR(256) NOT NULL,
    date_record DATE NOT NULL ,
    time_record TIME NOT NULL,
    comment_traffic VARCHAR(256),
    system_date DATE NOT NULL,
    system_time TIME NOT NULL,
    user_id VARCHAR(256),
    FOREIGN KEY (provider_id) REFERENCES providers(provider_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id),
    FOREIGN KEY (exercise_id) REFERENCES exercises(exercise_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
-- CREATE TEBLE REFERENCES
CREATE TABLE bookings_references(
	booking_reference_id VARCHAR(256) PRIMARY KEY NOT NULL,
    booking_reference_number VARCHAR(256) NOT NULL,
    date_record DATE NOT NULL ,
    time_record TIME NOT NULL,
    status_payement TINYINT DEFAULT 0,
    status_output TINYINT DEFAULT 0,
    user_id VARCHAR(256),
    exercise_id VARCHAR(256) NOT NULL,
    FOREIGN KEY (exercise_id) REFERENCES exercises(exercise_id)
);

-- CREATE TABLE BOOKIG
CREATE TABLE IF NOT EXISTS bookings(
	booking_id VARCHAR(256) PRIMARY KEY NOT NULL,
    client_id VARCHAR(256) NOT NULL,
    product_id VARCHAR(256) NOT NULL,
    quantity DOUBLE NOT NULL,
    unite_price DOUBLE NOT NULL,
    booking_reference_id VARCHAR(256) NOT NULL,
    booking_description VARCHAR(100) NOT NULL,
    exercise_id VARCHAR(256) NOT NULL,
    date_record DATE NOT NULL ,
    time_record TIME NOT NULL,
    system_date DATE NOT NULL,
    system_time TIME NOT NULL,
    user_id VARCHAR(256),
    FOREIGN KEY (client_id) REFERENCES clients(client_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id),
    FOREIGN KEY (booking_reference_id) REFERENCES bookings_references(booking_reference_id),
    FOREIGN KEY (exercise_id) REFERENCES exercises(exercise_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
    
);
-- CREATE TABLE OUTPUT TRAFFIC
CREATE TABLE IF NOT EXISTS output_traffic(
	out_traffic_id VARCHAR(256) PRIMARY KEY NOT NULL,
	booking_id VARCHAR(256) NOT NULL,
    product_id VARCHAR(256) NOT NULL,
    quantity DOUBLE NOT NULL,
    unite_price DOUBLE NOT NULL,
    exercise_id VARCHAR(256) NOT NULL,
    booking_reference_id VARCHAR(256) NOT NULL,
    date_record DATE NOT NULL ,
    time_record TIME NOT NULL,
    system_date DATE NOT NULL,
    system_time TIME NOT NULL,
    envoy VARCHAR(30),
    user_id VARCHAR(256),
    FOREIGN KEY (booking_id) REFERENCES bookings(booking_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id),
    FOREIGN KEY (exercise_id) REFERENCES exercises(exercise_id),
    FOREIGN KEY (booking_reference_id) REFERENCES bookings_references(booking_reference_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
CREATE TABLE IF NOT EXISTS payement(
	payement_id VARCHAR(256) PRIMARY KEY NOT NULL,   
    booking_reference_id VARCHAR(256),
    date_record DATE NOT NULL ,
    time_record TIME NOT NULL,
    payement_mount DOUBLE NOT NULL,
    payement_envoy  VARCHAR(30),
    exercise_id VARCHAR(256),
    user_id VARCHAR(256),
    system_date DATE NOT NULL,
    system_time TIME NOT NULL,    
    FOREIGN KEY (booking_reference_id) REFERENCES bookings_references(booking_reference_id),
    FOREIGN KEY (exercise_id) REFERENCES exercises(exercise_id),    
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);