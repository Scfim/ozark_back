-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : jeu. 19 août 2021 à 23:05
-- Version du serveur :  10.4.18-MariaDB
-- Version de PHP : 7.4.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `ozark`
--
CREATE DATABASE IF NOT EXISTS `ozark` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `ozark`;

-- --------------------------------------------------------

--
-- Structure de la table `bookings`
--

CREATE TABLE `bookings` (
  `booking_id` varchar(256) NOT NULL,
  `client_id` varchar(256) NOT NULL,
  `product_id` varchar(256) NOT NULL,
  `quantity` double NOT NULL,
  `unite_price` double NOT NULL,
  `booking_reference_id` varchar(256) NOT NULL,
  `booking_description` varchar(100) NOT NULL,
  `exercise_id` varchar(256) NOT NULL,
  `date_record` date NOT NULL,
  `time_record` time NOT NULL,
  `system_date` date NOT NULL,
  `system_time` time NOT NULL,
  `user_id` varchar(256) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `bookings_references`
--

CREATE TABLE `bookings_references` (
  `booking_reference_id` varchar(256) NOT NULL,
  `booking_reference_number` varchar(256) NOT NULL,
  `date_record` date NOT NULL,
  `time_record` time NOT NULL,
  `status_payement` tinyint(4) DEFAULT 0,
  `status_output` tinyint(4) DEFAULT 0,
  `user_id` varchar(256) DEFAULT NULL,
  `exercise_id` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `categories`
--

CREATE TABLE `categories` (
  `categorie_id` varchar(256) NOT NULL,
  `categorie_name` varchar(100) NOT NULL,
  `categorie_type` varchar(20) NOT NULL,
  `system_date` date NOT NULL,
  `system_time` time NOT NULL,
  `user_id` varchar(256) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `clients`
--

CREATE TABLE `clients` (
  `client_id` varchar(256) NOT NULL,
  `client_name` varchar(100) NOT NULL,
  `client_adress` varchar(256) DEFAULT NULL,
  `client_phone_number` varchar(13) NOT NULL,
  `client_mail_adress` varchar(100) DEFAULT NULL,
  `system_date` date NOT NULL,
  `system_time` time NOT NULL,
  `user_id` varchar(256) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `etablishement`
--

CREATE TABLE `etablishement` (
  `etablishement_name` varchar(100) NOT NULL DEFAULT 'COORPORATION',
  `etablishement_mail` varchar(256) DEFAULT NULL,
  `etablishement_phone_number` varchar(13) NOT NULL DEFAULT '+243000000000',
  `etablishement_web_site` varchar(100) DEFAULT NULL,
  `etablishement_logo` varchar(256) NOT NULL DEFAULT 'logo.png',
  `etablishement_bp` varchar(10) DEFAULT NULL,
  `etablishment_adress` varchar(256) DEFAULT NULL,
  `system_date` date NOT NULL,
  `system_time` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `exercises`
--

CREATE TABLE `exercises` (
  `exercise_id` varchar(256) NOT NULL,
  `exercise_start_date` date NOT NULL,
  `exercise_end_date` date NOT NULL,
  `exercise_status` tinyint(4) DEFAULT 1,
  `system_date` date NOT NULL,
  `system_time` time NOT NULL,
  `user_id` varchar(256) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `input_traffic`
--

CREATE TABLE `input_traffic` (
  `input_traffic_id` varchar(256) NOT NULL,
  `provider_id` varchar(256) NOT NULL,
  `product_id` varchar(256) NOT NULL,
  `quantity` double NOT NULL,
  `unite_price` double NOT NULL,
  `lot_number` varchar(30) DEFAULT NULL,
  `expire_date` date DEFAULT NULL,
  `exercise_id` varchar(256) NOT NULL,
  `date_record` date NOT NULL,
  `time_record` time NOT NULL,
  `comment_traffic` varchar(256) DEFAULT NULL,
  `system_date` date NOT NULL,
  `system_time` time NOT NULL,
  `user_id` varchar(256) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `marks`
--

CREATE TABLE `marks` (
  `mark_id` varchar(256) NOT NULL,
  `mark_name` varchar(100) NOT NULL,
  `mark_description` text DEFAULT NULL,
  `system_date` date NOT NULL,
  `system_time` time NOT NULL,
  `user_id` varchar(256) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `output_traffic`
--

CREATE TABLE `output_traffic` (
  `out_traffic_id` varchar(256) NOT NULL,
  `booking_id` varchar(256) NOT NULL,
  `product_id` varchar(256) NOT NULL,
  `quantity` double NOT NULL,
  `unite_price` double NOT NULL,
  `exercise_id` varchar(256) NOT NULL,
  `booking_reference_id` varchar(256) NOT NULL,
  `date_record` date NOT NULL,
  `time_record` time NOT NULL,
  `system_date` date NOT NULL,
  `system_time` time NOT NULL,
  `envoy` varchar(30) DEFAULT NULL,
  `product_id_input_perisable` varchar(256) DEFAULT NULL,
  `user_id` varchar(256) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `payement`
--

CREATE TABLE `payement` (
  `payement_id` varchar(256) NOT NULL,
  `booking_reference_id` varchar(256) DEFAULT NULL,
  `date_record` date NOT NULL,
  `time_record` time NOT NULL,
  `payement_mount` double NOT NULL,
  `payement_envoy` varchar(30) DEFAULT NULL,
  `exercise_id` varchar(256) DEFAULT NULL,
  `user_id` varchar(256) DEFAULT NULL,
  `system_date` date NOT NULL,
  `system_time` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `products`
--

CREATE TABLE `products` (
  `product_id` varchar(256) NOT NULL,
  `sub_categorie_id` varchar(256) NOT NULL,
  `mark_id` varchar(256) DEFAULT NULL,
  `product_name` varchar(100) NOT NULL,
  `product_marque` varchar(100) DEFAULT NULL,
  `product_dosage` varchar(20) DEFAULT NULL,
  `product_forme` varchar(50) DEFAULT NULL,
  `product_format` varchar(50) DEFAULT NULL,
  `product_alert_stock` double DEFAULT NULL,
  `system_date` date NOT NULL,
  `system_time` time NOT NULL,
  `user_id` varchar(256) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `providers`
--

CREATE TABLE `providers` (
  `provider_id` varchar(256) NOT NULL,
  `provider_name` varchar(100) NOT NULL,
  `provider_adress` varchar(256) DEFAULT NULL,
  `provider_phone_number` varchar(13) NOT NULL,
  `provider_mail_adress` varchar(100) DEFAULT NULL,
  `system_date` date NOT NULL,
  `system_time` time NOT NULL,
  `user_id` varchar(256) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `sub_categories`
--

CREATE TABLE `sub_categories` (
  `sub_categorie_id` varchar(256) NOT NULL,
  `categorie_id` varchar(256) DEFAULT NULL,
  `sub_categorie_name` varchar(100) NOT NULL,
  `sub_categorie_type` varchar(20) NOT NULL,
  `system_date` date NOT NULL,
  `system_time` time NOT NULL,
  `user_id` varchar(256) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `user_id` varchar(256) NOT NULL,
  `user_first_name` varchar(30) NOT NULL,
  `user_last_name` varchar(30) NOT NULL,
  `user_phone_number` varchar(13) NOT NULL,
  `user_mail_adress` varchar(100) DEFAULT NULL,
  `user_type` varchar(30) NOT NULL,
  `user_pass_word` varchar(256) DEFAULT NULL,
  `user_image` varchar(100) DEFAULT NULL,
  `system_date` date NOT NULL,
  `system_time` time NOT NULL,
  `user_admin_id` varchar(256) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`booking_id`),
  ADD KEY `client_id` (`client_id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `booking_reference_id` (`booking_reference_id`),
  ADD KEY `exercise_id` (`exercise_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Index pour la table `bookings_references`
--
ALTER TABLE `bookings_references`
  ADD PRIMARY KEY (`booking_reference_id`),
  ADD KEY `exercise_id` (`exercise_id`);

--
-- Index pour la table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`categorie_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Index pour la table `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`client_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Index pour la table `exercises`
--
ALTER TABLE `exercises`
  ADD PRIMARY KEY (`exercise_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Index pour la table `input_traffic`
--
ALTER TABLE `input_traffic`
  ADD PRIMARY KEY (`input_traffic_id`),
  ADD KEY `provider_id` (`provider_id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `exercise_id` (`exercise_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Index pour la table `marks`
--
ALTER TABLE `marks`
  ADD PRIMARY KEY (`mark_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Index pour la table `output_traffic`
--
ALTER TABLE `output_traffic`
  ADD PRIMARY KEY (`out_traffic_id`),
  ADD KEY `booking_id` (`booking_id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `exercise_id` (`exercise_id`),
  ADD KEY `booking_reference_id` (`booking_reference_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Index pour la table `payement`
--
ALTER TABLE `payement`
  ADD PRIMARY KEY (`payement_id`),
  ADD KEY `booking_reference_id` (`booking_reference_id`),
  ADD KEY `exercise_id` (`exercise_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Index pour la table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`),
  ADD KEY `sub_categorie_id` (`sub_categorie_id`),
  ADD KEY `mark_id` (`mark_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Index pour la table `providers`
--
ALTER TABLE `providers`
  ADD PRIMARY KEY (`provider_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Index pour la table `sub_categories`
--
ALTER TABLE `sub_categories`
  ADD PRIMARY KEY (`sub_categorie_id`),
  ADD KEY `categorie_id` (`categorie_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `bookings`
--
ALTER TABLE `bookings`
  ADD CONSTRAINT `bookings_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `clients` (`client_id`),
  ADD CONSTRAINT `bookings_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`),
  ADD CONSTRAINT `bookings_ibfk_3` FOREIGN KEY (`booking_reference_id`) REFERENCES `bookings_references` (`booking_reference_id`),
  ADD CONSTRAINT `bookings_ibfk_4` FOREIGN KEY (`exercise_id`) REFERENCES `exercises` (`exercise_id`),
  ADD CONSTRAINT `bookings_ibfk_5` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Contraintes pour la table `bookings_references`
--
ALTER TABLE `bookings_references`
  ADD CONSTRAINT `bookings_references_ibfk_1` FOREIGN KEY (`exercise_id`) REFERENCES `exercises` (`exercise_id`);

--
-- Contraintes pour la table `categories`
--
ALTER TABLE `categories`
  ADD CONSTRAINT `categories_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Contraintes pour la table `clients`
--
ALTER TABLE `clients`
  ADD CONSTRAINT `clients_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Contraintes pour la table `exercises`
--
ALTER TABLE `exercises`
  ADD CONSTRAINT `exercises_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Contraintes pour la table `input_traffic`
--
ALTER TABLE `input_traffic`
  ADD CONSTRAINT `input_traffic_ibfk_1` FOREIGN KEY (`provider_id`) REFERENCES `providers` (`provider_id`),
  ADD CONSTRAINT `input_traffic_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`),
  ADD CONSTRAINT `input_traffic_ibfk_3` FOREIGN KEY (`exercise_id`) REFERENCES `exercises` (`exercise_id`),
  ADD CONSTRAINT `input_traffic_ibfk_4` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Contraintes pour la table `marks`
--
ALTER TABLE `marks`
  ADD CONSTRAINT `marks_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Contraintes pour la table `output_traffic`
--
ALTER TABLE `output_traffic`
  ADD CONSTRAINT `output_traffic_ibfk_1` FOREIGN KEY (`booking_id`) REFERENCES `bookings` (`booking_id`),
  ADD CONSTRAINT `output_traffic_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`),
  ADD CONSTRAINT `output_traffic_ibfk_3` FOREIGN KEY (`exercise_id`) REFERENCES `exercises` (`exercise_id`),
  ADD CONSTRAINT `output_traffic_ibfk_4` FOREIGN KEY (`booking_reference_id`) REFERENCES `bookings_references` (`booking_reference_id`),
  ADD CONSTRAINT `output_traffic_ibfk_5` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Contraintes pour la table `payement`
--
ALTER TABLE `payement`
  ADD CONSTRAINT `payement_ibfk_1` FOREIGN KEY (`booking_reference_id`) REFERENCES `bookings_references` (`booking_reference_id`),
  ADD CONSTRAINT `payement_ibfk_2` FOREIGN KEY (`exercise_id`) REFERENCES `exercises` (`exercise_id`),
  ADD CONSTRAINT `payement_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Contraintes pour la table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`sub_categorie_id`) REFERENCES `sub_categories` (`sub_categorie_id`),
  ADD CONSTRAINT `products_ibfk_2` FOREIGN KEY (`mark_id`) REFERENCES `marks` (`mark_id`),
  ADD CONSTRAINT `products_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Contraintes pour la table `providers`
--
ALTER TABLE `providers`
  ADD CONSTRAINT `providers_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Contraintes pour la table `sub_categories`
--
ALTER TABLE `sub_categories`
  ADD CONSTRAINT `sub_categories_ibfk_1` FOREIGN KEY (`categorie_id`) REFERENCES `categories` (`categorie_id`),
  ADD CONSTRAINT `sub_categories_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
