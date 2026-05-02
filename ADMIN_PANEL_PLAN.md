# Bistro Boss Admin Panel Plan

## Goal

Build an admin panel that fits this restaurant product as an operational workspace, not just a set of CRUD pages. The admin should be able to monitor business health, manage menu items, handle reservations, review payments, and control user access from one clean dashboard.

## Current Project Analysis

### Existing strengths

The project already has a strong base for an admin panel:

- Admin/user route split is already in place with `PrivateRoute` and `AdminRoute`.
- Core admin pages already exist:
  - `AdminHome`
  - `Additems`
  - `ManageItems`
  - `ManageBookings`
  - `AllUsers`
- Backend already supports the main data domains:
  - `users`
  - `menu`
  - `payments`
  - `bookings`
  - cart and review flows
- `GET /admin-stats` already gives a good starting point for overview cards.

### Current gaps

The current admin area works, but it still feels like separate pages instead of one coordinated system.

Main gaps:

1. No clear admin information architecture
   - Pages exist, but the flow between them is not organized by daily restaurant tasks.

2. Dashboard overview is too light
   - `AdminHome` shows summary cards, but no alerts, queue state, trends, or recent activity.

3. Reservation management is basic
   - Admin can change status, but there is no filtering, no date grouping, no capacity awareness, and no quick prioritization.

4. Menu management is functional but not operational
   - No search, category filter, stock status, publish/unpublish, featured flags, or image/price consistency checks.

5. User management is minimal
   - Only admin promotion and delete are available.
   - No role filtering, activity visibility, or account summary.

6. Payment visibility is incomplete for admin use
   - Payments exist, but there is no dedicated admin payment console for revenue tracking, failed payment review, or transaction monitoring.

7. Design consistency can improve
   - The app now has better shared spacing and modal styling, but the admin area still needs a stronger shared table, filter, badge, and page-header system.

## Recommended Admin Panel Structure

This project is a restaurant operations product, so the admin panel should be organized around daily workflows.

### 1. Overview

Purpose:
- Give the admin an instant snapshot of today’s business state.

Recommended widgets:
- Revenue today
- Total orders
- Active bookings
- Pending bookings
- Total users
- Total menu items
- Recent payments
- Recent reservations
- Quick action buttons

Recommended actions:
- Add item
- Review bookings
- Open menu management
- Open user management

### 2. Reservations

Purpose:
- Make bookings easy to monitor and act on during service.

Recommended features:
- Status filter: `pending`, `confirmed`, `cancelled`
- Date filter
- Search by guest name/email
- Booking detail drawer or modal
- Quick actions:
  - confirm
  - cancel
  - mark arrived
  - mark completed
- Optional future improvement:
  - table/capacity tracking

### 3. Menu Management

Purpose:
- Manage all food items from one reliable place.

Recommended features:
- Search by item name
- Filter by category
- Sort by price/name/category
- Create item
- Edit item
- Delete item
- Item status badges:
  - active
  - unavailable
  - featured
- Image preview and fallback handling

### 4. Orders and Payments

Purpose:
- Give admin visibility into transaction flow and sales health.

Recommended features:
- Payment list for all users
- Filter by date
- Search by user email or transaction ID
- Payment status badges
- Revenue summary cards
- Recent transaction table

Note:
- The backend already stores payment records. The admin panel should expose them in a dedicated page instead of only user payment history.

### 5. Users

Purpose:
- Manage access and review customer/admin accounts.

Recommended features:
- Search by name/email
- Filter by role
- Make admin
- Remove user
- Show joined date when available
- Show summary counts:
  - total users
  - admins
  - customers

### 6. Reviews and Content Moderation

Purpose:
- Keep customer-facing content healthy.

Recommended features:
- Review list
- Review approval/removal workflow
- Rating summary

Note:
- This is a good phase-2 feature if review moderation is not urgent.

### 7. Settings

Purpose:
- Keep restaurant-level controls in one place.

Recommended future features:
- Restaurant profile
- Contact details
- Social/contact content
- Opening hours
- Theme-safe asset uploads

## Recommended Navigation

### Sidebar structure

- Overview
- Reservations
- Menu
  - Add Item
  - Manage Items
- Payments
- Users
- Reviews
- Settings

### Quick access links

At the top of key pages, include:
- page title
- short description
- primary CTA
- secondary CTA if needed

Example:
- `Reservations` + `Review and update guest booking status` + `Today only`

## Recommended Design Direction

Keep the current Bistro Boss color profile and avoid introducing multicolor UI.

Design rules:

- Use the existing orange, neutral, white, and slate family only.
- Keep page horizontal padding aligned with the current `10px` rule.
- Use one page-shell pattern:
  - header
  - summary cards
  - toolbar
  - content table/grid
- Use one table style across all admin pages.
- Use one badge system across all statuses.
- Use one modal width and shared alert theme across all admin interactions.
- Prefer dense, scan-friendly layouts over decorative cards.

## Data and API Plan

### Already available backend support

- `GET /admin-stats`
- `GET /users`
- `PATCH /users/admin/:id`
- `DELETE /users/:id`
- `GET /menu`
- `POST /menu`
- `PATCH /menu/:id`
- `DELETE /menu/:id`
- `GET /bookings`
- `POST /bookings`
- `PATCH /bookings/:id`
- `DELETE /bookings/:id`
- payment history endpoints already exist for users

### Recommended backend additions

To make the admin panel much stronger, add:

1. `GET /admin/payments`
   - return all payments for admin
   - support search and date filters

2. `GET /admin/recent-activity`
   - recent bookings
   - recent payments
   - recent user signups

3. `GET /admin/bookings-summary`
   - today’s bookings
   - pending bookings
   - confirmed bookings

4. Menu metadata fields
   - `status`
   - `featured`
   - `updatedAt`

5. Booking metadata fields
   - `notes`
   - `arrivalStatus`
   - `updatedAt`

## Step-by-Step Implementation Plan

### Phase 1: Admin foundation cleanup

1. Standardize admin page shell
   - shared page header
   - shared summary card
   - shared table toolbar
   - shared empty/loading states

2. Clean up sidebar navigation
   - reorganize route labels
   - make admin menu task-focused

3. Normalize admin page spacing
   - keep all pages aligned to the same x-axis padding

### Phase 2: Stronger admin overview

4. Upgrade `AdminHome`
   - keep stat cards
   - add recent bookings panel
   - add recent payments panel
   - add quick action buttons
   - add pending workload summary

5. Add trend-ready summary blocks
   - bookings today
   - revenue today
   - latest signups

### Phase 3: Reservations console

6. Upgrade `ManageBookings`
   - status filter
   - date filter
   - search
   - stronger row layout
   - richer status actions

7. Add booking detail view
   - guest details
   - reservation notes
   - timestamps

### Phase 4: Menu operations

8. Upgrade `ManageItems`
   - search
   - category filter
   - sort controls
   - status badges
   - improved actions layout

9. Upgrade `Additems` and `UpdateItem`
   - stronger validation
   - better form grouping
   - consistent upload feedback

### Phase 5: User administration

10. Upgrade `AllUsers`
   - search
   - role filter
   - summary counts
   - clearer actions

11. Add user detail summary
   - optional side panel or future page

### Phase 6: Payments for admin

12. Create admin payments page
   - all payment records
   - revenue summary
   - transaction search
   - payment status view

13. Add route and sidebar entry
   - admin-only page

### Phase 7: Reviews and moderation

14. Add review management page
   - list reviews
   - delete or moderate reviews
   - show rating summary

### Phase 8: Final polish

15. Standardize all badges, buttons, and modals

16. Add responsive checks
   - desktop table behavior
   - mobile overflow handling
   - sticky toolbar behavior where helpful

17. Add focused verification
   - route protection
   - CRUD success states
   - empty states
   - loading states

## Suggested Route Plan

Recommended admin routes:

- `/dashboard/adminHome`
- `/dashboard/manageBookings`
- `/dashboard/addItems`
- `/dashboard/manageItems`
- `/dashboard/allUsers`
- `/dashboard/adminPayments`
- `/dashboard/manageReviews`
- `/dashboard/settings`

## Build Priority

If we want the most impact with the least disruption, build in this order:

1. `AdminHome`
2. `ManageBookings`
3. `ManageItems`
4. `AllUsers`
5. `Admin Payments`
6. `Review moderation`
7. `Settings`

## Success Criteria

The admin panel is successful when:

- an admin can understand today’s business state in under 10 seconds
- reservations can be filtered and updated quickly
- menu items can be added and maintained with low friction
- payment data is visible to admins, not only users
- user management feels controlled and safe
- all admin pages share one consistent layout and interaction language

## Recommended Next Build Slice

The best next implementation slice for this project is:

1. Upgrade `AdminHome`
2. Turn `ManageBookings` into a real reservations console
3. Add an `Admin Payments` page

That sequence gives the biggest operational improvement without needing a full app rewrite.
