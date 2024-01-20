CREATE TABLE product(
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  description VARCHAR(200) NOT NULL,
  price DECIMAL(10,2),
  image VARCHAR(200) NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)