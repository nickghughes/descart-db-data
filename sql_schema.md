# User
- id
- display_name
- email

# Product
- id
- name
- image_url
- manufacturer_id
- category_id

# Manufacturer
- id
- name

# Category
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
- price
- url

# Purchase
- id
- store_id
- user_id
- price
- num_items
- purchased_at

# PurchaseProduct
- id
- purchase_id
- product_id
- price
- quantity
- index

# PurchaseCustomProduct
- id
- purchase_id
- name
- price
- quantity
- index

# FavoriteProduct
- id
- product_id
- user_id

# FavoritePurchase
- id
- purchase_id
- user_id

### Everything should have created_at and updated_at fields by default, lmk if not