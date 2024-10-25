
CREATE TABLE public.status (
    status_id integer NOT NULL,
    status_name character varying,
    next_status_id integer
);


ALTER TABLE public.status ALTER COLUMN status_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.status_status_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 216 (class 1259 OID 40982)
-- Name: ticket; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ticket (
    ticket_id integer NOT NULL,
    title character varying NOT NULL,
    "desc" character varying NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    contract_info character varying NOT NULL,
    status_id integer NOT NULL
);

ALTER TABLE public.ticket ALTER COLUMN ticket_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.ticket_ticket_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 3358 (class 0 OID 40997)
-- Dependencies: 218
-- Data for Name: status; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.status (status_id, status_name, next_status_id) OVERRIDING SYSTEM VALUE VALUES (1, 'pending', NULL);
INSERT INTO public.status (status_id, status_name, next_status_id) OVERRIDING SYSTEM VALUE VALUES (2, 'accepted', NULL);
INSERT INTO public.status (status_id, status_name, next_status_id) OVERRIDING SYSTEM VALUE VALUES (3, 'resolved', NULL);
INSERT INTO public.status (status_id, status_name, next_status_id) OVERRIDING SYSTEM VALUE VALUES (4, 'rejected', NULL);


ALTER TABLE ONLY public.status
    ADD CONSTRAINT status_pk PRIMARY KEY (status_id);


--
-- TOC entry 3209 (class 2606 OID 40988)
-- Name: ticket ticket_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ticket
    ADD CONSTRAINT ticket_pk PRIMARY KEY (ticket_id);


-- Completed on 2024-10-26 00:50:54

--
-- PostgreSQL database dump complete
--

