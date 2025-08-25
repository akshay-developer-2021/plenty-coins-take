# Products Management Demo

## Overview

This demo adds a complete Products management system to the existing Refine admin panel, showcasing full CRUD operations with proper form validation and data relationships.

## Features Added

### 1. Products Resource

- **Resource Name**: `products`
- **API Endpoint**: Uses the existing fake REST API (`https://api.fake-rest.refine.dev`)
- **Full CRUD Support**: Create, Read, Update, Delete operations

### 2. Product Fields

- **Name**: Text field (required)
- **Description**: Textarea field (required)
- **Price**: Number field with decimal support (required, min: 0)
- **Category**: Dropdown linked to existing categories resource
- **Stock**: Number field (required, min: 0)
- **Status**: Dropdown with options: Active, Inactive, Discontinued
- **Timestamps**: Created At, Updated At (auto-generated)

### 3. Components Created

#### ProductList (`/products`)

- Table view with all product fields
- Price formatting with currency symbol
- Status badges with color coding
- Category relationship display
- Action buttons for Show/Edit operations
- Create button for new products

#### ProductCreate (`/products/create`)

- Form with validation
- Category dropdown populated from categories resource
- Price and stock validation (non-negative numbers)
- Status selection with default "active"

#### ProductEdit (`/products/edit/:id`)

- Pre-populated form with existing data
- Same validation as create form
- Navigation to Show/List pages

#### ProductShow (`/products/show/:id`)

- Detailed view of product information
- Formatted price display
- Status badge with color coding
- Navigation to Edit/List pages

### 4. Integration Points

#### Navigation

- Products automatically added to main menu via Refine's `useMenu()` hook
- Proper routing with React Router
- Breadcrumb navigation support

#### Data Relationships

- Products linked to Categories via foreign key
- Category names displayed in product lists and forms
- Proper data fetching with `useMany()` hook for category data

#### Form Validation

- Required field validation
- Numeric validation for price and stock
- Proper error message display
- Form state management with React Hook Form

## Technical Implementation

### Refine Hooks Used

- `useTable()` - For list view with sorting and filtering
- `useForm()` - For create/edit forms with validation
- `useOne()` - For single record display
- `useMany()` - For related category data
- `useSelect()` - For category dropdown options
- `useNavigation()` - For page navigation

### File Structure

```
src/pages/products/
├── index.ts          # Export barrel file
├── list.tsx          # Product listing with table
├── create.tsx        # Product creation form
├── edit.tsx          # Product editing form
└── show.tsx          # Product detail view
```

### App.tsx Updates

- Added products resource definition
- Added product routes to React Router
- Imported all product components

## Demo Data

The products will work with the existing fake REST API, which provides:

- Sample product data
- Category relationships
- Proper ID management
- Timestamp handling

## Testing the Demo

1. Navigate to `/products` to see the product list
2. Click "Create" to add a new product
3. Fill in the form with sample data
4. Use "Show" and "Edit" buttons to test CRUD operations
5. Verify category relationships work properly

## Next Steps

This demo can be extended with:

- Real backend API integration
- Image upload for product photos
- Advanced filtering and search
- Bulk operations
- Product variants/skus
- Inventory tracking
