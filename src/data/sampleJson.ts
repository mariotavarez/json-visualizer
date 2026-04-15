export const SAMPLE_JSON = `{
  "user": {
    "id": "usr_8f2a91bc",
    "name": "Mario Tavarez",
    "email": "mario@example.com",
    "age": 32,
    "verified": true,
    "avatar": null,
    "address": {
      "street": "1234 Elm Street",
      "city": "San Francisco",
      "state": "CA",
      "zip": "94103",
      "country": "US",
      "coordinates": {
        "lat": 37.7749,
        "lng": -122.4194
      }
    },
    "contacts": [
      {
        "type": "phone",
        "value": "+1-555-0192",
        "primary": true
      },
      {
        "type": "phone",
        "value": "+1-555-0847",
        "primary": false
      },
      {
        "type": "email",
        "value": "mario.work@example.com",
        "primary": false
      }
    ],
    "preferences": {
      "theme": "dark",
      "language": "en-US",
      "notifications": {
        "email": true,
        "sms": false,
        "push": true
      }
    }
  },
  "orders": [
    {
      "id": "ord_001",
      "status": "delivered",
      "createdAt": "2024-11-15T08:30:00Z",
      "total": 149.99,
      "currency": "USD",
      "items": [
        {
          "sku": "LAPTOP-BAG-LG",
          "name": "Laptop Bag Large",
          "quantity": 1,
          "unitPrice": 79.99,
          "tags": ["electronics", "accessories"]
        },
        {
          "sku": "USB-HUB-7P",
          "name": "7-Port USB Hub",
          "quantity": 2,
          "unitPrice": 35.00,
          "tags": ["electronics"]
        }
      ],
      "shipping": {
        "method": "express",
        "carrier": "FedEx",
        "trackingNumber": "FX9281736450",
        "estimatedDays": 2
      }
    },
    {
      "id": "ord_002",
      "status": "processing",
      "createdAt": "2024-12-01T14:22:00Z",
      "total": 299.00,
      "currency": "USD",
      "items": [
        {
          "sku": "MECH-KB-TKL",
          "name": "TKL Mechanical Keyboard",
          "quantity": 1,
          "unitPrice": 299.00,
          "tags": ["electronics", "peripherals", "keyboard"]
        }
      ],
      "shipping": {
        "method": "standard",
        "carrier": "UPS",
        "trackingNumber": null,
        "estimatedDays": 5
      }
    }
  ],
  "metadata": {
    "createdAt": "2023-03-10T09:00:00Z",
    "updatedAt": "2024-12-01T14:22:00Z",
    "version": 3,
    "flags": ["beta_tester", "early_adopter"],
    "stats": {
      "totalOrders": 2,
      "totalSpent": 448.99,
      "avgOrderValue": 224.50,
      "lastLogin": "2024-12-01T13:55:42Z",
      "loginCount": 147
    }
  }
}`;
