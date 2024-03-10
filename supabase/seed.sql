-- create test users - name: user1@example.com pass: password123
INSERT INTO
    auth.users (
        instance_id,
        id,
        aud,
        role,
        email,
        encrypted_password,
        email_confirmed_at,
        recovery_sent_at,
        last_sign_in_at,
        raw_app_meta_data,
        raw_user_meta_data,
        created_at,
        updated_at,
        confirmation_token,
        email_change,
        email_change_token_new,
        recovery_token
    ) (
        select
            '00000000-0000-0000-0000-000000000000',
            uuid_generate_v4(),
            'authenticated',
            'authenticated',
            'user' || (ROW_NUMBER() OVER ()) || '@example.com',
            crypt ('password123', gen_salt ('bf')),
            current_timestamp,
            current_timestamp,
            current_timestamp,
            '{"provider":"email","providers":["email"]}',
            '{}',
            current_timestamp,
            current_timestamp,
            '',
            '',
            '',
            ''
        FROM
            generate_series(1, 10)
    );

-- test user email identities
INSERT INTO
    auth.identities (
        id,
        user_id,
        provider_id,
        identity_data,
        provider,
        last_sign_in_at,
        created_at,
        updated_at
    ) (
        select
            uuid_generate_v4(),
            id,
            uuid_generate_v4(),
            format('{"sub":"%s","email":"%s"}', id::text, email)::jsonb,
            'email',
            current_timestamp,
            current_timestamp,
            current_timestamp
        from
            auth.users
    );

-- test routines
INSERT INTO
    public.routines (
      user_id,
      name,
      state_str
    ) VALUES (
      (SELECT id FROM auth.users WHERE email = 'user1@example.com'),
      'Motor',
      '{"r":[{"r":"<XIO(B)![<XIC(A)>|<XIC(C)>]!OTE(C)>","c":"The Motor seals itself on after being energized by the Start tag.\\nIt will remain on until the circuit is broken by the Stop tag."}],"t":[{"n":"Start","t":"b","v":false},{"n":"Stop","t":"b","v":false},{"n":"Motor","t":"b","v":false}]}'
    ), (
      (SELECT id FROM auth.users WHERE email = 'user1@example.com'),
      'Traffic Light',
      '{"r":[{"r":"<[<XIC(D.tt)!OTE(A)>|<XIC(E.tt)!OTE(B)>|<XIC(F.tt)!OTE(C)>]>","c":"This rung controls outputs in the physical world. All others are internal.\\nThe lights turn on when their respective .tt (timer timing) bit is true."},{"r":"<EQU(G,1)![<TON(D,7,0)>|<XIC(D.dn)!MOV(2,G)>]>","c":"Once the .dn (done) bit becomes true, the state tag is changed to move to the next step of the process.\\nThe use of a state tag makes it easy to move between steps and insert new steps in the future."},{"r":"<EQU(G,2)![<TON(E,3,0)>|<XIC(E.dn)!MOV(3,G)>]>"},{"r":"<EQU(G,3)![<TON(F,10,0)>|<XIC(F.dn)!MOV(1,G)>]>"}],"t":[{"n":"Green_Light","t":"b","v":false},{"n":"Yellow_Light","t":"b","v":false},{"n":"Red_Light","t":"b","v":true},{"n":"Green_Timer","t":"t","v":{"p":7,"a":0,"d":false,"t":false,"s":0}},{"n":"Yellow_Timer","t":"t","v":{"p":3,"a":0,"d":false,"t":false,"s":0}},{"n":"Red_Timer","t":"t","v":{"p":10,"a":0,"d":false,"t":true,"s":0}},{"n":"State","t":"n","v":1}]}'
    ),
    (
      (SELECT id FROM auth.users WHERE email = 'user2@example.com'),
      'Traffic Light',
      '{"r":[{"r":"<[<XIC(D.tt)!OTE(A)>|<XIC(E.tt)!OTE(B)>|<XIC(F.tt)!OTE(C)>]>","c":"This rung controls outputs in the physical world. All others are internal.\\nThe lights turn on when their respective .tt (timer timing) bit is true."},{"r":"<EQU(G,1)![<TON(D,7,0)>|<XIC(D.dn)!MOV(2,G)>]>","c":"Once the .dn (done) bit becomes true, the state tag is changed to move to the next step of the process.\\nThe use of a state tag makes it easy to move between steps and insert new steps in the future."},{"r":"<EQU(G,2)![<TON(E,3,0)>|<XIC(E.dn)!MOV(3,G)>]>"},{"r":"<EQU(G,3)![<TON(F,10,0)>|<XIC(F.dn)!MOV(1,G)>]>"}],"t":[{"n":"Green_Light","t":"b","v":false},{"n":"Yellow_Light","t":"b","v":false},{"n":"Red_Light","t":"b","v":true},{"n":"Green_Timer","t":"t","v":{"p":7,"a":0,"d":false,"t":false,"s":0}},{"n":"Yellow_Timer","t":"t","v":{"p":3,"a":0,"d":false,"t":false,"s":0}},{"n":"Red_Timer","t":"t","v":{"p":10,"a":0,"d":false,"t":true,"s":0}},{"n":"State","t":"n","v":1}]}'
    );
    
UPDATE auth.users SET email_confirmed_at = null WHERE id = (SELECT id FROM auth.users WHERE email = 'user2@example.com');