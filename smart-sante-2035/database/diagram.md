# Diagramme relationnel - Smart Santé 2035

```text
       +---------+        +-----------+        +------------+
       |  roles  |<-------|   users   |------->| hospitals  |
       +---------+        +-----------+        +------------+
                                |                    |  |  |
                                |                    |  |  +---> beds
                                v                    |  |
                          +-----------+              |  +---> hospital_routes
                          | patients  |              |
                          +-----------+              |
                                |                    |
                                v                    |
                          +-----------+              |
                          |  triages  |--------------+
                          +-----------+
                                |
                                v
                          +-----------+
                          | transfers |
                          +-----------+

       +---------------+        +-----------+
       | notifications |        | audit_logs|
       +---------------+        +-----------+
```

## Relations principales
- `users.role_id` → `roles.id`
- `users.hospital_id` → `hospitals.id`
- `patients.created_by` → `users.id`
- `triages.patient_id` → `patients.id`
- `triages.hospital_id` → `hospitals.id`
- `transfers.from_hospital_id` / `to_hospital_id` → `hospitals.id`
- `beds.hospital_id` → `hospitals.id`
- `hospital_routes.from_hospital_id` / `to_hospital_id` → `hospitals.id`
