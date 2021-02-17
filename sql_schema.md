# User
- id
- display_name
- email

# Product
- id
- name
- image_url
- manufacturer_id

# Manufacturer
- id
- name

# Store
- id
- name
- image_url
- website_url

# StoreProduct
- id
- product_id
- store_id

# Purchase
- id
- store_id
- user_id
- price
- timestamp

# PurchaseProduct
- id
- purchase_id
- product_id
- price
- quantity

# FavoriteProduct
- id
- product_id
- user_id

# FavoritePurchase
- id
- purchase_id
- user_id

### Everything should have created_at and updated_at fields by default, lmk if not