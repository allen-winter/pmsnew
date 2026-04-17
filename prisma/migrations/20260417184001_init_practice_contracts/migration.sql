-- CreateTable
CREATE TABLE `icd10_codes` (
    `id` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,
    `long_description` TEXT NULL,
    `chapter` VARCHAR(191) NULL,
    `chapter_description` TEXT NULL,
    `block_code` VARCHAR(191) NULL,
    `block_description` TEXT NULL,
    `is_pmb` BOOLEAN NOT NULL DEFAULT false,
    `is_cdl` BOOLEAN NOT NULL DEFAULT false,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `effective_from` DATETIME(3) NOT NULL,
    `effective_to` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `icd10_codes_code_key`(`code`),
    INDEX `icd10_codes_code_idx`(`code`),
    INDEX `icd10_codes_is_pmb_idx`(`is_pmb`),
    INDEX `icd10_codes_is_cdl_idx`(`is_cdl`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tariff_codes` (
    `id` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,
    `short_description` VARCHAR(191) NULL,
    `tariff_guide` VARCHAR(191) NOT NULL,
    `discipline_code` VARCHAR(191) NULL,
    `discipline_name` VARCHAR(191) NULL,
    `default_price` DOUBLE NULL,
    `unit_type` VARCHAR(191) NULL,
    `base_time_minutes` INTEGER NULL,
    `excess_time_rate` DOUBLE NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `effective_from` DATETIME(3) NOT NULL,
    `effective_to` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `tariff_codes_code_key`(`code`),
    INDEX `tariff_codes_code_idx`(`code`),
    INDEX `tariff_codes_tariff_guide_idx`(`tariff_guide`),
    INDEX `tariff_codes_discipline_code_idx`(`discipline_code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `modifier_codes` (
    `id` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,
    `short_description` VARCHAR(191) NULL,
    `modifier_type` VARCHAR(191) NOT NULL,
    `apply_to` VARCHAR(191) NULL,
    `value_type` VARCHAR(191) NULL,
    `default_value` DOUBLE NULL,
    `is_time_based` BOOLEAN NOT NULL DEFAULT false,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `effective_from` DATETIME(3) NOT NULL,
    `effective_to` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `modifier_codes_code_key`(`code`),
    INDEX `modifier_codes_code_idx`(`code`),
    INDEX `modifier_codes_modifier_type_idx`(`modifier_type`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tariff_modifiers` (
    `id` VARCHAR(191) NOT NULL,
    `tariff_code_id` VARCHAR(191) NOT NULL,
    `modifier_id` VARCHAR(191) NOT NULL,
    `is_mandatory` BOOLEAN NOT NULL DEFAULT false,
    `sequence` INTEGER NULL,

    UNIQUE INDEX `tariff_modifiers_tariff_code_id_modifier_id_key`(`tariff_code_id`, `modifier_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `nappi_codes` (
    `id` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,
    `short_description` VARCHAR(191) NULL,
    `generic_name` VARCHAR(191) NULL,
    `strength` VARCHAR(191) NULL,
    `form` VARCHAR(191) NULL,
    `pack_size` INTEGER NOT NULL DEFAULT 1,
    `unit_of_measure` VARCHAR(191) NOT NULL,
    `single_exit_price` DOUBLE NULL,
    `nappi_type` VARCHAR(191) NULL,
    `schedule` VARCHAR(191) NULL,
    `atc_code` VARCHAR(191) NULL,
    `is_prescription_required` BOOLEAN NOT NULL DEFAULT true,
    `is_controlled` BOOLEAN NOT NULL DEFAULT false,
    `is_chronic` BOOLEAN NOT NULL DEFAULT false,
    `is_cdl` BOOLEAN NOT NULL DEFAULT false,
    `default_dispensing_fee` DOUBLE NULL,
    `default_container_fee` DOUBLE NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `effective_from` DATETIME(3) NOT NULL,
    `effective_to` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `nappi_codes_code_key`(`code`),
    INDEX `nappi_codes_code_idx`(`code`),
    INDEX `nappi_codes_schedule_idx`(`schedule`),
    INDEX `nappi_codes_atc_code_idx`(`atc_code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `scheme_options` (
    `id` VARCHAR(191) NOT NULL,
    `scheme_code` VARCHAR(191) NOT NULL,
    `scheme_name` VARCHAR(191) NOT NULL,
    `option_code` VARCHAR(191) NOT NULL,
    `option_name` VARCHAR(191) NOT NULL,
    `administrator` VARCHAR(191) NULL,
    `option_type` VARCHAR(191) NULL,
    `claim_type` VARCHAR(191) NULL,
    `auth_check` BOOLEAN NOT NULL DEFAULT false,
    `fam_check` BOOLEAN NOT NULL DEFAULT false,
    `chf_checks` BOOLEAN NOT NULL DEFAULT false,
    `mmap_ref_urp` VARCHAR(191) NULL,
    `pricing` VARCHAR(191) NULL,
    `mark_up_formula` VARCHAR(191) NULL,
    `dispensing_fee_formula` VARCHAR(191) NULL,
    `switch_out` BOOLEAN NOT NULL DEFAULT false,
    `membership_prefix` VARCHAR(191) NULL,
    `membership_length` INTEGER NULL,
    `membership_suffix` VARCHAR(191) NULL,
    `reversal_period` VARCHAR(191) NULL,
    `is_sep` BOOLEAN NOT NULL DEFAULT false,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `effective_from` DATETIME(3) NOT NULL,
    `effective_to` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `scheme_options_scheme_code_idx`(`scheme_code`),
    INDEX `scheme_options_option_code_idx`(`option_code`),
    UNIQUE INDEX `scheme_options_scheme_code_option_code_key`(`scheme_code`, `option_code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `clinical_test_types` (
    `id` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `clinical_test_types_type_key`(`type`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `clinical_sub_types` (
    `id` VARCHAR(191) NOT NULL,
    `clinical_type_id` VARCHAR(191) NOT NULL,
    `subtype` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `uom` VARCHAR(191) NULL,
    `is_mandatory` BOOLEAN NOT NULL DEFAULT false,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `clinical_sub_types_clinical_type_id_subtype_key`(`clinical_type_id`, `subtype`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `place_of_service_codes` (
    `id` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `is_inpatient` BOOLEAN NOT NULL DEFAULT false,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `place_of_service_codes_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `disposal_codes` (
    `id` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `disposal_codes_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `council_types` (
    `id` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `council_types_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `benefit_types` (
    `id` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `benefit_types_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `deduction_types` (
    `id` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `deduction_types_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pricing_tariff_indicators` (
    `id` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `pricing_tariff_indicators_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `coding_sets` (
    `id` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `coding_sets_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `item_types` (
    `id` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `item_types_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `transaction_codes` (
    `id` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `transaction_codes_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `practices` (
    `id` VARCHAR(191) NOT NULL,
    `practice_display_id` VARCHAR(191) NULL,
    `bhf_number` VARCHAR(191) NOT NULL,
    `practice_name` VARCHAR(191) NOT NULL,
    `practice_type` VARCHAR(191) NOT NULL,
    `vat_number` VARCHAR(191) NULL,
    `cipc_number` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `billing_policy` TEXT NULL,
    `rooms_default_rate` DOUBLE NULL,
    `inhospital_default_rate` DOUBLE NULL,
    `additional_notes` TEXT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `practices_practice_display_id_key`(`practice_display_id`),
    UNIQUE INDEX `practices_bhf_number_key`(`bhf_number`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `practice_disciplines` (
    `id` VARCHAR(191) NOT NULL,
    `practice_id` VARCHAR(191) NOT NULL,
    `discipline_code` VARCHAR(191) NULL,
    `discipline_name` VARCHAR(191) NOT NULL,
    `is_other` BOOLEAN NOT NULL DEFAULT false,
    `other_text` VARCHAR(191) NULL,

    INDEX `practice_disciplines_practice_id_idx`(`practice_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `practice_specializations` (
    `id` VARCHAR(191) NOT NULL,
    `practice_id` VARCHAR(191) NOT NULL,
    `specialization_name` VARCHAR(191) NOT NULL,
    `is_other` BOOLEAN NOT NULL DEFAULT false,
    `other_text` VARCHAR(191) NULL,
    `sub_specialization` VARCHAR(191) NULL,
    `is_sub_other` BOOLEAN NOT NULL DEFAULT false,
    `sub_other_text` VARCHAR(191) NULL,

    INDEX `practice_specializations_practice_id_idx`(`practice_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `practice_locations` (
    `id` VARCHAR(191) NOT NULL,
    `practice_id` VARCHAR(191) NOT NULL,
    `is_main` BOOLEAN NOT NULL DEFAULT false,
    `location_number` INTEGER NOT NULL,
    `address_line1` VARCHAR(191) NOT NULL,
    `address_line2` VARCHAR(191) NULL,
    `suburb` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `province` VARCHAR(191) NOT NULL,
    `postal_code` VARCHAR(191) NOT NULL,

    INDEX `practice_locations_practice_id_idx`(`practice_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `practice_working_hours` (
    `id` VARCHAR(191) NOT NULL,
    `practice_id` VARCHAR(191) NOT NULL,
    `day_of_week` INTEGER NOT NULL,
    `is_open` BOOLEAN NOT NULL DEFAULT true,
    `start_time1` VARCHAR(191) NULL,
    `end_time1` VARCHAR(191) NULL,
    `start_time2` VARCHAR(191) NULL,
    `end_time2` VARCHAR(191) NULL,
    `is_24_hours` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `bank_details` (
    `id` VARCHAR(191) NOT NULL,
    `practice_id` VARCHAR(191) NOT NULL,
    `bank_name` VARCHAR(191) NOT NULL,
    `branch_name` VARCHAR(191) NULL,
    `branch_code` VARCHAR(191) NULL,
    `account_number` VARCHAR(191) NOT NULL,
    `account_type` VARCHAR(191) NULL,
    `account_holder` VARCHAR(191) NULL,
    `bank_address` TEXT NULL,
    `is_bank_other` BOOLEAN NOT NULL DEFAULT false,
    `bank_other_text` VARCHAR(191) NULL,
    `is_account_other` BOOLEAN NOT NULL DEFAULT false,
    `account_other_text` VARCHAR(191) NULL,

    INDEX `bank_details_practice_id_idx`(`practice_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `practice_contracts` (
    `id` VARCHAR(191) NOT NULL,
    `practice_id` VARCHAR(191) NOT NULL,
    `contract_type` VARCHAR(191) NOT NULL,
    `is_other` BOOLEAN NOT NULL DEFAULT false,
    `other_text` VARCHAR(191) NULL,
    `scheme_admin` VARCHAR(191) NULL,
    `scheme` VARCHAR(191) NOT NULL,
    `plan` VARCHAR(191) NULL,
    `category` VARCHAR(191) NULL,
    `level` VARCHAR(191) NULL,
    `rate_type` VARCHAR(191) NOT NULL,
    `amount` DOUBLE NOT NULL,
    `start_date` DATETIME(3) NULL,
    `end_date` DATETIME(3) NULL,

    INDEX `practice_contracts_practice_id_idx`(`practice_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `practice_documents` (
    `id` VARCHAR(191) NOT NULL,
    `practice_id` VARCHAR(191) NOT NULL,
    `document_name` VARCHAR(191) NOT NULL,
    `file_url` VARCHAR(191) NOT NULL,
    `file_type` VARCHAR(191) NULL,
    `file_size` INTEGER NULL,
    `uploaded_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `practice_documents_practice_id_idx`(`practice_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `doctors` (
    `id` VARCHAR(191) NOT NULL,
    `doctor_display_id` VARCHAR(191) NULL,
    `title` VARCHAR(191) NULL,
    `first_name` VARCHAR(191) NOT NULL,
    `last_name` VARCHAR(191) NOT NULL,
    `initials` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NULL,
    `hpcsa_number` VARCHAR(191) NOT NULL,
    `practice_number` VARCHAR(191) NULL,
    `council_type_id` VARCHAR(191) NULL,
    `dispensing_license_no` VARCHAR(191) NULL,
    `dispensing_license_expiry` DATETIME(3) NULL,
    `discipline_code` VARCHAR(191) NULL,
    `discipline_name` VARCHAR(191) NULL,
    `discipline_is_other` BOOLEAN NOT NULL DEFAULT false,
    `discipline_other_text` VARCHAR(191) NULL,
    `specialisation_code` VARCHAR(191) NULL,
    `specialisation_name` VARCHAR(191) NULL,
    `specialisation_is_other` BOOLEAN NOT NULL DEFAULT false,
    `specialisation_other_text` VARCHAR(191) NULL,
    `sub_specialisation` VARCHAR(191) NULL,
    `sub_is_other` BOOLEAN NOT NULL DEFAULT false,
    `sub_other_text` VARCHAR(191) NULL,
    `is_network` BOOLEAN NOT NULL DEFAULT false,
    `is_ipa` BOOLEAN NOT NULL DEFAULT false,
    `is_dispensing` BOOLEAN NOT NULL DEFAULT false,
    `rooms_default_rate` DOUBLE NULL,
    `inhospital_default_rate` DOUBLE NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `doctors_doctor_display_id_key`(`doctor_display_id`),
    UNIQUE INDEX `doctors_hpcsa_number_key`(`hpcsa_number`),
    INDEX `doctors_hpcsa_number_idx`(`hpcsa_number`),
    INDEX `doctors_practice_number_idx`(`practice_number`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `doctor_practices` (
    `doctor_id` VARCHAR(191) NOT NULL,
    `practice_id` VARCHAR(191) NOT NULL,
    `start_date` DATETIME(3) NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`doctor_id`, `practice_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `doctor_contracts` (
    `id` VARCHAR(191) NOT NULL,
    `doctor_id` VARCHAR(191) NOT NULL,
    `contract_type` VARCHAR(191) NOT NULL,
    `is_other` BOOLEAN NOT NULL DEFAULT false,
    `other_text` VARCHAR(191) NULL,
    `scheme_admin` VARCHAR(191) NULL,
    `scheme` VARCHAR(191) NOT NULL,
    `plan` VARCHAR(191) NULL,
    `category` VARCHAR(191) NULL,
    `level` VARCHAR(191) NULL,
    `rate_type` VARCHAR(191) NOT NULL,
    `amount` DOUBLE NOT NULL,
    `start_date` DATETIME(3) NULL,
    `end_date` DATETIME(3) NULL,

    INDEX `doctor_contracts_doctor_id_idx`(`doctor_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `doctor_availability` (
    `id` VARCHAR(191) NOT NULL,
    `doctor_id` VARCHAR(191) NOT NULL,
    `day_of_week` INTEGER NOT NULL,
    `start_time` VARCHAR(191) NOT NULL,
    `end_time` VARCHAR(191) NOT NULL,
    `slot_duration` INTEGER NOT NULL DEFAULT 15,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `doctor_availability_doctor_id_day_of_week_key`(`doctor_id`, `day_of_week`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `doctor_time_ranges` (
    `id` VARCHAR(191) NOT NULL,
    `doctor_id` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NULL,
    `day_of_week` INTEGER NULL,
    `start_time` VARCHAR(191) NOT NULL,
    `end_time` VARCHAR(191) NOT NULL,
    `slot_duration` INTEGER NOT NULL DEFAULT 15,
    `is_recurring` BOOLEAN NOT NULL DEFAULT false,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `description` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `doctor_time_ranges_doctor_id_idx`(`doctor_id`),
    INDEX `doctor_time_ranges_date_idx`(`date`),
    INDEX `doctor_time_ranges_day_of_week_idx`(`day_of_week`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `patients` (
    `id` VARCHAR(191) NOT NULL,
    `patient_display_id` VARCHAR(191) NULL,
    `family_id` VARCHAR(191) NULL,
    `title` VARCHAR(191) NOT NULL,
    `first_name` VARCHAR(191) NOT NULL,
    `last_name` VARCHAR(191) NOT NULL,
    `initials` VARCHAR(191) NOT NULL,
    `id_type` VARCHAR(191) NOT NULL,
    `id_number` VARCHAR(191) NULL,
    `passport_number` VARCHAR(191) NULL,
    `date_of_birth` DATETIME(3) NOT NULL,
    `gender` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NOT NULL,
    `address_line1` VARCHAR(191) NOT NULL,
    `address_line2` VARCHAR(191) NULL,
    `suburb` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `province` VARCHAR(191) NOT NULL,
    `postal_code` VARCHAR(191) NOT NULL,
    `occupation` VARCHAR(191) NULL,
    `employer` VARCHAR(191) NULL,
    `work_phone` VARCHAR(191) NULL,
    `marital_status` VARCHAR(191) NOT NULL,
    `emergency_contact_name` VARCHAR(191) NOT NULL,
    `emergency_contact_phone` VARCHAR(191) NOT NULL,
    `relationship_to_patient` VARCHAR(191) NOT NULL,
    `is_newborn` BOOLEAN NOT NULL DEFAULT false,
    `birth_time` VARCHAR(191) NULL,
    `is_emergency` BOOLEAN NOT NULL DEFAULT false,
    `received_time` DATETIME(3) NULL,
    `race` VARCHAR(191) NULL,
    `weight` INTEGER NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `patients_patient_display_id_key`(`patient_display_id`),
    UNIQUE INDEX `patients_id_number_key`(`id_number`),
    INDEX `patients_id_number_idx`(`id_number`),
    INDEX `patients_family_id_idx`(`family_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `patient_scheme_details` (
    `id` VARCHAR(191) NOT NULL,
    `patient_id` VARCHAR(191) NOT NULL,
    `scheme_option_id` VARCHAR(191) NOT NULL,
    `member_number` VARCHAR(191) NOT NULL,
    `dependant_code` VARCHAR(191) NOT NULL,
    `main_member_name` VARCHAR(191) NULL,
    `main_member_id_number` VARCHAR(191) NULL,
    `date_joined` DATETIME(3) NULL,
    `gap_cover` BOOLEAN NOT NULL DEFAULT false,
    `gap_cover_details` VARCHAR(191) NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `patient_scheme_details_member_number_idx`(`member_number`),
    INDEX `patient_scheme_details_dependant_code_idx`(`dependant_code`),
    UNIQUE INDEX `patient_scheme_details_patient_id_scheme_option_id_key`(`patient_id`, `scheme_option_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `patient_documents` (
    `id` VARCHAR(191) NOT NULL,
    `patient_id` VARCHAR(191) NOT NULL,
    `document_name` VARCHAR(191) NOT NULL,
    `file_url` VARCHAR(191) NOT NULL,
    `file_type` VARCHAR(191) NULL,
    `file_size` INTEGER NULL,
    `uploaded_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `patient_documents_patient_id_idx`(`patient_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `patient_reports` (
    `id` VARCHAR(191) NOT NULL,
    `patient_id` VARCHAR(191) NOT NULL,
    `appointment_id` VARCHAR(191) NULL,
    `report_type` VARCHAR(191) NOT NULL,
    `report_name` VARCHAR(191) NOT NULL,
    `file_url` VARCHAR(191) NOT NULL,
    `file_size` INTEGER NULL,
    `mime_type` VARCHAR(191) NULL,
    `uploaded_by` VARCHAR(191) NULL,
    `uploaded_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `ai_extracted_data` JSON NULL,
    `ai_summary` TEXT NULL,
    `ai_findings` JSON NULL,

    INDEX `patient_reports_patient_id_idx`(`patient_id`),
    INDEX `patient_reports_appointment_id_idx`(`appointment_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `appointments` (
    `id` VARCHAR(191) NOT NULL,
    `appointment_display_id` VARCHAR(191) NULL,
    `patient_id` VARCHAR(191) NOT NULL,
    `doctor_id` VARCHAR(191) NOT NULL,
    `practice_location_id` VARCHAR(191) NULL,
    `date` DATETIME(3) NOT NULL,
    `time_slot` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'booked',
    `reason_for_visit` TEXT NULL,
    `past_medication` TEXT NULL,
    `medical_history` JSON NULL,
    `height` DOUBLE NULL,
    `weight` DOUBLE NULL,
    `previous_doctors` JSON NULL,
    `documents` JSON NULL,
    `vitals` JSON NULL,
    `cancellation_reason` VARCHAR(191) NULL,
    `cancelled_at` DATETIME(3) NULL,
    `rescheduled_from` JSON NULL,
    `reschedule_reason` VARCHAR(191) NULL,
    `rescheduled_at` DATETIME(3) NULL,
    `rescheduled_by` VARCHAR(191) NULL,
    `soap_subjective` LONGTEXT NULL,
    `soap_objective` LONGTEXT NULL,
    `soap_assessment` LONGTEXT NULL,
    `soap_plan` LONGTEXT NULL,
    `consultation_notes` LONGTEXT NULL,
    `doctor_notes` LONGTEXT NULL,
    `patient_notes` LONGTEXT NULL,
    `clinical_notes` LONGTEXT NULL,
    `assessment` LONGTEXT NULL,
    `plan` LONGTEXT NULL,
    `consultation_status` VARCHAR(191) NOT NULL DEFAULT 'PENDING',
    `triage_status` VARCHAR(191) NOT NULL DEFAULT 'PENDING',
    `called_in_at` DATETIME(3) NULL,
    `called_out_at` DATETIME(3) NULL,
    `consultation_started_at` DATETIME(3) NULL,
    `consultation_ended_at` DATETIME(3) NULL,
    `video_room_id` VARCHAR(191) NULL,
    `video_invite_sent_at` DATETIME(3) NULL,
    `video_started_at` DATETIME(3) NULL,
    `video_ended_at` DATETIME(3) NULL,
    `ai_generated_summary` LONGTEXT NULL,
    `ai_prescription_suggestions` JSON NULL,
    `ai_diagnosis_suggestions` JSON NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `referred_from_id` VARCHAR(191) NULL,

    UNIQUE INDEX `appointments_appointment_display_id_key`(`appointment_display_id`),
    UNIQUE INDEX `appointments_referred_from_id_key`(`referred_from_id`),
    INDEX `appointments_patient_id_idx`(`patient_id`),
    INDEX `appointments_doctor_id_idx`(`doctor_id`),
    INDEX `appointments_date_idx`(`date`),
    INDEX `appointments_status_idx`(`status`),
    UNIQUE INDEX `appointments_doctor_id_date_time_slot_key`(`doctor_id`, `date`, `time_slot`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `referrals` (
    `id` VARCHAR(191) NOT NULL,
    `referral_display_id` VARCHAR(191) NULL,
    `appointment_id` VARCHAR(191) NOT NULL,
    `referred_to_doctor_id` VARCHAR(191) NULL,
    `referred_to_doctor_name` VARCHAR(191) NOT NULL,
    `referred_to_practice_name` VARCHAR(191) NULL,
    `referral_type` VARCHAR(191) NOT NULL,
    `referral_reason` VARCHAR(191) NOT NULL,
    `referral_notes` TEXT NULL,
    `urgency` VARCHAR(191) NOT NULL,
    `practice_location` VARCHAR(191) NULL,
    `external_practice_name` VARCHAR(191) NULL,
    `external_practice_address` TEXT NULL,
    `external_practice_phone` VARCHAR(191) NULL,
    `send_notification` BOOLEAN NOT NULL DEFAULT true,
    `share_medical_records` BOOLEAN NOT NULL DEFAULT true,
    `notes_for_referred_doctor` TEXT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'PENDING',
    `referred_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `responded_at` DATETIME(3) NULL,
    `response_notes` TEXT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `new_appointment_id` VARCHAR(191) NULL,

    UNIQUE INDEX `referrals_referral_display_id_key`(`referral_display_id`),
    UNIQUE INDEX `referrals_new_appointment_id_key`(`new_appointment_id`),
    INDEX `referrals_appointment_id_idx`(`appointment_id`),
    INDEX `referrals_referred_to_doctor_id_idx`(`referred_to_doctor_id`),
    INDEX `referrals_status_idx`(`status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `diagnosis_records` (
    `id` VARCHAR(191) NOT NULL,
    `appointment_id` VARCHAR(191) NOT NULL,
    `icd_code_id` VARCHAR(191) NOT NULL,
    `is_primary` BOOLEAN NOT NULL DEFAULT false,
    `is_secondary` BOOLEAN NOT NULL DEFAULT false,
    `notes` TEXT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `patientId` VARCHAR(191) NULL,

    INDEX `diagnosis_records_appointment_id_idx`(`appointment_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `procedure_records` (
    `id` VARCHAR(191) NOT NULL,
    `appointment_id` VARCHAR(191) NOT NULL,
    `tariff_code_id` VARCHAR(191) NOT NULL,
    `quantity` INTEGER NOT NULL DEFAULT 1,
    `unit_price` DOUBLE NOT NULL,
    `total_amount` DOUBLE NOT NULL,
    `icd_code_id` VARCHAR(191) NULL,
    `notes` TEXT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `patientId` VARCHAR(191) NULL,

    INDEX `procedure_records_appointment_id_idx`(`appointment_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `procedure_modifiers` (
    `id` VARCHAR(191) NOT NULL,
    `procedure_record_id` VARCHAR(191) NOT NULL,
    `modifier_code_id` VARCHAR(191) NOT NULL,
    `value` DOUBLE NULL,

    UNIQUE INDEX `procedure_modifiers_procedure_record_id_modifier_code_id_key`(`procedure_record_id`, `modifier_code_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `clinical_details` (
    `id` VARCHAR(191) NOT NULL,
    `appointment_id` VARCHAR(191) NULL,
    `claim_item_id` VARCHAR(191) NULL,
    `clinical_type_id` VARCHAR(191) NOT NULL,
    `clinical_sub_type_id` VARCHAR(191) NOT NULL,
    `value` VARCHAR(191) NOT NULL,
    `uom` VARCHAR(191) NULL,
    `consent` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `clinical_details_appointment_id_idx`(`appointment_id`),
    INDEX `clinical_details_claim_item_id_idx`(`claim_item_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `prescriptions` (
    `id` VARCHAR(191) NOT NULL,
    `prescription_no` VARCHAR(191) NOT NULL,
    `appointment_id` VARCHAR(191) NOT NULL,
    `patient_id` VARCHAR(191) NOT NULL,
    `doctor_id` VARCHAR(191) NOT NULL,
    `prescription_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `status` VARCHAR(191) NOT NULL DEFAULT 'ACTIVE',
    `notes` TEXT NULL,
    `created_by` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `prescriptions_prescription_no_key`(`prescription_no`),
    INDEX `prescriptions_prescription_no_idx`(`prescription_no`),
    INDEX `prescriptions_appointment_id_idx`(`appointment_id`),
    INDEX `prescriptions_patient_id_idx`(`patient_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `prescription_items` (
    `id` VARCHAR(191) NOT NULL,
    `prescription_id` VARCHAR(191) NOT NULL,
    `nappi_code_id` VARCHAR(191) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `dosage` VARCHAR(191) NULL,
    `duration` INTEGER NULL,
    `duration_unit` VARCHAR(191) NULL,
    `timing` VARCHAR(191) NULL,
    `frequency` VARCHAR(191) NULL,
    `instructions` TEXT NULL,
    `icd_code_id` VARCHAR(191) NULL,
    `is_chronic` BOOLEAN NOT NULL DEFAULT false,
    `is_cdl` BOOLEAN NOT NULL DEFAULT false,
    `is_mixture` INTEGER NULL DEFAULT 0,
    `repeats` INTEGER NULL DEFAULT 0,
    `repeats_used` INTEGER NULL DEFAULT 0,
    `unit_price` DOUBLE NOT NULL,
    `dispensing_fee` DOUBLE NULL,
    `total_amount` DOUBLE NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'PENDING',
    `quantity_dispensed` INTEGER NULL DEFAULT 0,
    `dispensed_at` DATETIME(3) NULL,
    `dispensed_by` VARCHAR(191) NULL,
    `productId` VARCHAR(191) NULL,

    INDEX `prescription_items_prescription_id_idx`(`prescription_id`),
    INDEX `prescription_items_nappi_code_id_idx`(`nappi_code_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `bills` (
    `id` VARCHAR(191) NOT NULL,
    `bill_number` VARCHAR(191) NOT NULL,
    `appointment_id` VARCHAR(191) NOT NULL,
    `patient_id` VARCHAR(191) NOT NULL,
    `bill_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `due_date` DATETIME(3) NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'DRAFT',
    `subtotal` DOUBLE NOT NULL,
    `vat_amount` DOUBLE NOT NULL,
    `total_amount` DOUBLE NOT NULL,
    `amount_paid` DOUBLE NOT NULL DEFAULT 0,
    `balance_due` DOUBLE NOT NULL,
    `payment_method` VARCHAR(191) NULL,
    `payment_reference` VARCHAR(191) NULL,
    `paid_at` DATETIME(3) NULL,
    `notes` TEXT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `bills_bill_number_key`(`bill_number`),
    INDEX `bills_bill_number_idx`(`bill_number`),
    INDEX `bills_appointment_id_idx`(`appointment_id`),
    INDEX `bills_status_idx`(`status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `bill_items` (
    `id` VARCHAR(191) NOT NULL,
    `bill_id` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `reference_id` VARCHAR(191) NULL,
    `description` TEXT NOT NULL,
    `quantity` INTEGER NOT NULL,
    `unit_price` DOUBLE NOT NULL,
    `vat_rate` DOUBLE NOT NULL DEFAULT 15.0,
    `vat_amount` DOUBLE NOT NULL,
    `total_amount` DOUBLE NOT NULL,
    `medical_aid_liable` DOUBLE NULL,
    `patient_liable` DOUBLE NULL,
    `nappi_code_id` VARCHAR(191) NULL,
    `icd_code_id` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `bill_item_diagnoses` (
    `id` VARCHAR(191) NOT NULL,
    `bill_item_id` VARCHAR(191) NOT NULL,
    `icd_code_id` VARCHAR(191) NOT NULL,
    `is_primary` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `bill_item_diagnoses_bill_item_id_icd_code_id_key`(`bill_item_id`, `icd_code_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `bill_modifiers` (
    `id` VARCHAR(191) NOT NULL,
    `bill_item_id` VARCHAR(191) NOT NULL,
    `modifier_code_id` VARCHAR(191) NOT NULL,
    `value` DOUBLE NULL,

    UNIQUE INDEX `bill_modifiers_bill_item_id_modifier_code_id_key`(`bill_item_id`, `modifier_code_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `claims` (
    `id` VARCHAR(191) NOT NULL,
    `claim_number` VARCHAR(191) NOT NULL,
    `bill_id` VARCHAR(191) NOT NULL,
    `appointment_id` VARCHAR(191) NOT NULL,
    `patient_id` VARCHAR(191) NOT NULL,
    `doctor_id` VARCHAR(191) NOT NULL,
    `practice_id` VARCHAR(191) NOT NULL,
    `scheme_option_id` VARCHAR(191) NOT NULL,
    `transaction_code_id` VARCHAR(191) NOT NULL,
    `submission_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `date_of_service` DATETIME(3) NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'PENDING',
    `submission_xml` LONGTEXT NULL,
    `response_xml` LONGTEXT NULL,
    `response_json` JSON NULL,
    `submitted_amount` DOUBLE NOT NULL,
    `approved_amount` DOUBLE NULL,
    `paid_amount` DOUBLE NULL,
    `rejection_reason` TEXT NULL,
    `submitted_at` DATETIME(3) NULL,
    `approved_at` DATETIME(3) NULL,
    `paid_at` DATETIME(3) NULL,
    `reversal_claim_id` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `claims_claim_number_key`(`claim_number`),
    UNIQUE INDEX `claims_bill_id_key`(`bill_id`),
    INDEX `claims_claim_number_idx`(`claim_number`),
    INDEX `claims_status_idx`(`status`),
    INDEX `claims_submission_date_idx`(`submission_date`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `claim_items` (
    `id` VARCHAR(191) NOT NULL,
    `claim_id` VARCHAR(191) NOT NULL,
    `bill_item_id` VARCHAR(191) NULL,
    `line_number` INTEGER NOT NULL,
    `item_type_id` VARCHAR(191) NOT NULL,
    `coding_set_id` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `unit_price` DOUBLE NOT NULL,
    `total_amount` DOUBLE NOT NULL,
    `nappi_code_id` VARCHAR(191) NULL,
    `tariff_code_id` VARCHAR(191) NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'SUBMITTED',
    `response_code` VARCHAR(191) NULL,
    `response_message` VARCHAR(191) NULL,
    `scheme_rate` DOUBLE NULL,
    `scheme_paid_amount` DOUBLE NULL,
    `member_liability` DOUBLE NULL,

    INDEX `claim_items_claim_id_idx`(`claim_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `claim_item_modifiers` (
    `id` VARCHAR(191) NOT NULL,
    `claim_item_id` VARCHAR(191) NOT NULL,
    `modifier_code_id` VARCHAR(191) NOT NULL,
    `value` DOUBLE NULL,

    UNIQUE INDEX `claim_item_modifiers_claim_item_id_modifier_code_id_key`(`claim_item_id`, `modifier_code_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `claim_item_diagnoses` (
    `id` VARCHAR(191) NOT NULL,
    `claim_item_id` VARCHAR(191) NOT NULL,
    `icd_code_id` VARCHAR(191) NOT NULL,
    `stage_ind` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `claim_item_diagnoses_claim_item_id_icd_code_id_key`(`claim_item_id`, `icd_code_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `claim_item_benefits` (
    `id` VARCHAR(191) NOT NULL,
    `claim_item_id` VARCHAR(191) NOT NULL,
    `benefit_type_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `claim_item_benefits_claim_item_id_benefit_type_id_key`(`claim_item_id`, `benefit_type_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `claim_scheme_details` (
    `id` VARCHAR(191) NOT NULL,
    `claim_id` VARCHAR(191) NOT NULL,
    `scheme_option_id` VARCHAR(191) NOT NULL,
    `member_number` VARCHAR(191) NOT NULL,
    `dependant_code` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `claim_scheme_details_claim_id_key`(`claim_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `claim_patients` (
    `id` VARCHAR(191) NOT NULL,
    `claim_id` VARCHAR(191) NOT NULL,
    `patient_id` VARCHAR(191) NOT NULL,
    `initials` VARCHAR(191) NOT NULL,
    `first_name` VARCHAR(191) NULL,
    `last_name` VARCHAR(191) NOT NULL,
    `date_of_birth` DATETIME(3) NOT NULL,
    `dependant_code` VARCHAR(191) NOT NULL,
    `gender` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `claim_patients_claim_id_key`(`claim_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `claim_financials` (
    `id` VARCHAR(191) NOT NULL,
    `claim_id` VARCHAR(191) NOT NULL,
    `submitted_gross` DOUBLE NOT NULL,
    `submitted_discount` DOUBLE NOT NULL,
    `submitted_claim_amount` DOUBLE NOT NULL,
    `copy_fee` DOUBLE NULL,
    `late_fee` DOUBLE NULL,
    `excess_time_fee` DOUBLE NULL,
    `dispensing_fee` DOUBLE NULL,
    `service_fee` DOUBLE NULL,
    `eligibility_amount` DOUBLE NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `pricingTariffIndicatorId` VARCHAR(191) NULL,

    UNIQUE INDEX `claim_financials_claim_id_key`(`claim_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `item_financials` (
    `id` VARCHAR(191) NOT NULL,
    `claim_item_id` VARCHAR(191) NOT NULL,
    `pricing_tariff_ind_id` VARCHAR(191) NULL,
    `price` DOUBLE NOT NULL,
    `basis_of_cost` VARCHAR(191) NULL,
    `submitted_discount` DOUBLE NULL,
    `copay` DOUBLE NULL,
    `container_fee` DOUBLE NULL,
    `dispensing_fee` DOUBLE NULL,
    `service_fee` DOUBLE NULL,
    `gross` DOUBLE NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `item_financials_claim_item_id_key`(`claim_item_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `eras` (
    `id` VARCHAR(191) NOT NULL,
    `era_number` VARCHAR(191) NOT NULL,
    `era_date` DATETIME(3) NOT NULL,
    `practice_id` VARCHAR(191) NOT NULL,
    `file_sequence_no` INTEGER NOT NULL,
    `file_layout_ver` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `eras_era_number_key`(`era_number`),
    INDEX `eras_era_number_idx`(`era_number`),
    INDEX `eras_practice_id_idx`(`practice_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `era_files` (
    `id` VARCHAR(191) NOT NULL,
    `era_id` VARCHAR(191) NOT NULL,
    `file_name` VARCHAR(191) NOT NULL,
    `file_content` LONGTEXT NULL,
    `file_xml` LONGTEXT NULL,
    `file_format` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `era_files_era_id_key`(`era_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `scheme_eras` (
    `id` VARCHAR(191) NOT NULL,
    `era_id` VARCHAR(191) NOT NULL,
    `administrator_name` VARCHAR(191) NOT NULL,
    `administrator_code` VARCHAR(191) NULL,
    `scheme_name` VARCHAR(191) NOT NULL,
    `scheme_code` VARCHAR(191) NULL,
    `scheme_era_number` VARCHAR(191) NOT NULL,
    `scheme_era_date` DATETIME(3) NOT NULL,
    `scheme_era_type` VARCHAR(191) NULL,
    `total_paid_provider` DOUBLE NOT NULL,
    `total_paid_member` DOUBLE NULL,
    `total_not_paid` DOUBLE NULL,
    `total_member_liability` DOUBLE NULL,
    `acb_cheque_amount` DOUBLE NULL,
    `scheme_paid_date` DATETIME(3) NULL,
    `scheme_paid_ref` VARCHAR(191) NULL,
    `scheme_message` TEXT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `scheme_eras_era_id_idx`(`era_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `era_banks` (
    `id` VARCHAR(191) NOT NULL,
    `scheme_era_id` VARCHAR(191) NOT NULL,
    `bank_name` VARCHAR(191) NULL,
    `branch_code` VARCHAR(191) NULL,
    `account_holder` VARCHAR(191) NULL,
    `account_number` VARCHAR(191) NULL,
    `account_type` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `era_banks_scheme_era_id_key`(`scheme_era_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `era_balances` (
    `id` VARCHAR(191) NOT NULL,
    `scheme_era_id` VARCHAR(191) NOT NULL,
    `opening_balance` DOUBLE NULL,
    `closing_balance` DOUBLE NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `era_balances_scheme_era_id_key`(`scheme_era_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `era_claims` (
    `id` VARCHAR(191) NOT NULL,
    `scheme_era_id` VARCHAR(191) NOT NULL,
    `claim_id` VARCHAR(191) NULL,
    `provider_claim_no` VARCHAR(191) NULL,
    `scheme_claim_no` VARCHAR(191) NULL,
    `treatment_date` DATETIME(3) NOT NULL,
    `provider_ref_no` VARCHAR(191) NOT NULL,
    `claim_status` VARCHAR(191) NULL,
    `provider_bhf_no` VARCHAR(191) NOT NULL,
    `provider_name` VARCHAR(191) NULL,
    `provider_group` VARCHAR(191) NULL,
    `switch_house_name` VARCHAR(191) NULL,
    `switch_claim_id` VARCHAR(191) NULL,
    `member_number` VARCHAR(191) NOT NULL,
    `main_member_initials` VARCHAR(191) NULL,
    `main_member_name` VARCHAR(191) NULL,
    `main_member_surname` VARCHAR(191) NULL,
    `old_member_number` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `era_claims_scheme_era_id_idx`(`scheme_era_id`),
    INDEX `era_claims_claim_id_idx`(`claim_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `era_claim_patients` (
    `id` VARCHAR(191) NOT NULL,
    `era_claim_id` VARCHAR(191) NOT NULL,
    `patient_id` VARCHAR(191) NULL,
    `initials` VARCHAR(191) NULL,
    `first_name` VARCHAR(191) NULL,
    `surname` VARCHAR(191) NULL,
    `date_of_birth` DATETIME(3) NULL,
    `dependant_code` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `era_claim_patients_era_claim_id_key`(`era_claim_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `era_claim_financials` (
    `id` VARCHAR(191) NOT NULL,
    `era_claim_id` VARCHAR(191) NOT NULL,
    `provider_claimed_amt` DOUBLE NOT NULL,
    `switch_claimed_amt` DOUBLE NULL,
    `scheme_paid_to_provider` DOUBLE NOT NULL,
    `scheme_paid_to_member` DOUBLE NULL,
    `scheme_member_to_pay` DOUBLE NULL,
    `scheme_non_paid` DOUBLE NULL,
    `scheme_total_deductions` DOUBLE NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `era_claim_financials_era_claim_id_key`(`era_claim_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `era_claim_lines` (
    `id` VARCHAR(191) NOT NULL,
    `era_claim_id` VARCHAR(191) NOT NULL,
    `line_number` INTEGER NOT NULL,
    `date_of_service` DATETIME(3) NOT NULL,
    `rendering_provider_bhf_no` VARCHAR(191) NULL,
    `rendering_provider_name` VARCHAR(191) NULL,
    `procedure_code` VARCHAR(191) NULL,
    `product_code` VARCHAR(191) NULL,
    `product_code_suffix` VARCHAR(191) NULL,
    `billing_practice_line_no` VARCHAR(191) NULL,
    `scheme_line_no` VARCHAR(191) NULL,
    `switch_line_no` VARCHAR(191) NULL,
    `scheme_ref_no` VARCHAR(191) NULL,
    `line_status` VARCHAR(191) NULL,
    `lab_number` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `era_claim_lines_era_claim_id_idx`(`era_claim_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `era_line_patients` (
    `id` VARCHAR(191) NOT NULL,
    `era_line_id` VARCHAR(191) NOT NULL,
    `patient_id` VARCHAR(191) NULL,
    `initials` VARCHAR(191) NULL,
    `first_name` VARCHAR(191) NULL,
    `surname` VARCHAR(191) NULL,
    `date_of_birth` DATETIME(3) NULL,
    `dependant_code` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `era_line_patients_era_line_id_key`(`era_line_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `era_line_financials` (
    `id` VARCHAR(191) NOT NULL,
    `era_line_id` VARCHAR(191) NOT NULL,
    `billing_practice_amt` DOUBLE NOT NULL,
    `switch_claimed_amt` DOUBLE NULL,
    `scheme_rate` DOUBLE NULL,
    `scheme_paid_to_provider` DOUBLE NOT NULL,
    `scheme_paid_to_member` DOUBLE NULL,
    `scheme_member_to_pay` DOUBLE NULL,
    `scheme_non_paid` DOUBLE NULL,
    `scheme_total_deductions` DOUBLE NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `era_line_financials_era_line_id_key`(`era_line_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `era_line_modifiers` (
    `id` VARCHAR(191) NOT NULL,
    `era_line_id` VARCHAR(191) NOT NULL,
    `modifier_code` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `era_claim_deductions` (
    `id` VARCHAR(191) NOT NULL,
    `era_claim_id` VARCHAR(191) NOT NULL,
    `deduction_type_id` VARCHAR(191) NOT NULL,
    `amount` DOUBLE NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `era_line_deductions` (
    `id` VARCHAR(191) NOT NULL,
    `era_line_id` VARCHAR(191) NOT NULL,
    `deduction_type_id` VARCHAR(191) NOT NULL,
    `amount` DOUBLE NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `era_claim_messages` (
    `id` VARCHAR(191) NOT NULL,
    `era_claim_id` VARCHAR(191) NOT NULL,
    `reason_type` VARCHAR(191) NULL,
    `reason_code` VARCHAR(191) NULL,
    `reason_desc` TEXT NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `era_line_messages` (
    `id` VARCHAR(191) NOT NULL,
    `era_line_id` VARCHAR(191) NOT NULL,
    `reason_type` VARCHAR(191) NULL,
    `reason_code` VARCHAR(191) NULL,
    `reason_desc` TEXT NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `era_adjustments` (
    `id` VARCHAR(191) NOT NULL,
    `scheme_era_id` VARCHAR(191) NOT NULL,
    `adjustment_ref` VARCHAR(191) NULL,
    `adjustment_date` DATETIME(3) NOT NULL,
    `adjustment_amt` DOUBLE NOT NULL,
    `adjustment_desc` TEXT NOT NULL,
    `reason_type` VARCHAR(191) NULL,
    `reason_code` VARCHAR(191) NULL,
    `reason_desc` TEXT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `doctor_details` (
    `id` VARCHAR(191) NOT NULL,
    `doctor_id` VARCHAR(191) NOT NULL,
    `claim_id` VARCHAR(191) NULL,
    `event_number` VARCHAR(191) NULL,
    `encounter_number` VARCHAR(191) NULL,
    `auth_number` VARCHAR(191) NULL,
    `member_account_number` VARCHAR(191) NULL,
    `referral_tracking_no` VARCHAR(191) NULL,
    `place_of_service_code_id` VARCHAR(191) NULL,
    `disposal_code_id` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `doctor_details_doctor_id_idx`(`doctor_id`),
    INDEX `doctor_details_claim_id_idx`(`claim_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `bhf_details` (
    `id` VARCHAR(191) NOT NULL,
    `claim_id` VARCHAR(191) NOT NULL,
    `prescribing_id` VARCHAR(191) NULL,
    `referring_id` VARCHAR(191) NULL,
    `admitting_id` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `doctorId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `hpc_details` (
    `id` VARCHAR(191) NOT NULL,
    `bhf_detail_id` VARCHAR(191) NOT NULL,
    `prescribing_hpc` VARCHAR(191) NULL,
    `referring_hpc` VARCHAR(191) NULL,
    `admitting_hpc` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `additional_bhf_infos` (
    `id` VARCHAR(191) NOT NULL,
    `claim_item_id` VARCHAR(191) NOT NULL,
    `type_indicator` VARCHAR(191) NOT NULL,
    `bhf_number` VARCHAR(191) NOT NULL,
    `hpc_number` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `assistants` (
    `id` VARCHAR(191) NOT NULL,
    `claim_item_id` VARCHAR(191) NOT NULL,
    `doctor_id` VARCHAR(191) NOT NULL,
    `council_type_id` VARCHAR(191) NULL,
    `council_reg_no` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `other_details` (
    `id` VARCHAR(191) NOT NULL,
    `claim_id` VARCHAR(191) NOT NULL,
    `wca_number` VARCHAR(191) NULL,
    `insurance_ref_no` VARCHAR(191) NULL,
    `accident_date` DATETIME(3) NULL,
    `pre_issued_tx_no` VARCHAR(191) NULL,
    `pin_block` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `treatment_details` (
    `id` VARCHAR(191) NOT NULL,
    `claim_item_id` VARCHAR(191) NOT NULL,
    `start_date` DATETIME(3) NOT NULL,
    `start_time` VARCHAR(191) NULL,
    `end_date` DATETIME(3) NOT NULL,
    `end_time` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `refill_details` (
    `id` VARCHAR(191) NOT NULL,
    `claim_item_id` VARCHAR(191) NOT NULL,
    `refill_code` VARCHAR(191) NOT NULL,
    `number_of_refills` INTEGER NULL,
    `refill_authorised` VARCHAR(191) NULL,
    `original_rx_number` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dental_details` (
    `id` VARCHAR(191) NOT NULL,
    `claim_item_id` VARCHAR(191) NOT NULL,
    `number_of_teeth` INTEGER NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dental_teeth` (
    `id` VARCHAR(191) NOT NULL,
    `dental_detail_id` VARCHAR(191) NOT NULL,
    `tooth_number` VARCHAR(191) NOT NULL,
    `surface` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dental_lab_details` (
    `id` VARCHAR(191) NOT NULL,
    `claim_item_id` VARCHAR(191) NOT NULL,
    `dental_reg_number` VARCHAR(191) NOT NULL,
    `council_type_id` VARCHAR(191) NOT NULL,
    `lab_reference_no` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `optometry_details` (
    `id` VARCHAR(191) NOT NULL,
    `claim_item_id` VARCHAR(191) NOT NULL,
    `eye` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `optometry_exams` (
    `id` VARCHAR(191) NOT NULL,
    `optometry_detail_id` VARCHAR(191) NOT NULL,
    `visual_acuity` VARCHAR(191) NULL,
    `visual_fields` TEXT NULL,
    `intra_ocular_pressure` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `optometry_exams_optometry_detail_id_key`(`optometry_detail_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `optometry_lenses` (
    `id` VARCHAR(191) NOT NULL,
    `optometry_detail_id` VARCHAR(191) NOT NULL,
    `sphere` VARCHAR(191) NULL,
    `cylinder` VARCHAR(191) NULL,
    `axis` VARCHAR(191) NULL,
    `read_add` VARCHAR(191) NULL,
    `prism` VARCHAR(191) NULL,
    `base` VARCHAR(191) NULL,
    `condition_desc` VARCHAR(191) NULL,
    `diameter` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `optometry_lenses_optometry_detail_id_key`(`optometry_detail_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `optometry_frames` (
    `id` VARCHAR(191) NOT NULL,
    `optometry_detail_id` VARCHAR(191) NOT NULL,
    `nvs_tag_number` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `optometry_frames_optometry_detail_id_key`(`optometry_detail_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `suppliers` (
    `id` VARCHAR(191) NOT NULL,
    `supplier_code` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `contact_person` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NULL,
    `address` TEXT NULL,
    `vat_number` VARCHAR(191) NULL,
    `registration_no` VARCHAR(191) NULL,
    `payment_terms` VARCHAR(191) NULL,
    `lead_time_days` INTEGER NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `suppliers_supplier_code_key`(`supplier_code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `products` (
    `id` VARCHAR(191) NOT NULL,
    `product_code` VARCHAR(191) NOT NULL,
    `nappi_code_id` VARCHAR(191) NULL,
    `name` VARCHAR(191) NOT NULL,
    `generic_name` VARCHAR(191) NULL,
    `category` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `unit_of_measure` VARCHAR(191) NOT NULL,
    `pack_size` INTEGER NOT NULL DEFAULT 1,
    `dispensing_unit` VARCHAR(191) NOT NULL,
    `purchase_price` DOUBLE NULL,
    `selling_price_general` DOUBLE NULL,
    `selling_price_worker` DOUBLE NULL,
    `dispensing_fee` DOUBLE NULL,
    `vat_percentage` DOUBLE NOT NULL DEFAULT 15.0,
    `reorder_level` INTEGER NULL,
    `reorder_quantity` INTEGER NULL,
    `max_stock_level` INTEGER NULL,
    `lead_time_days` INTEGER NULL,
    `drug_schedule` VARCHAR(191) NULL,
    `atc_code` VARCHAR(191) NULL,
    `is_prescription_required` BOOLEAN NOT NULL DEFAULT true,
    `is_controlled` BOOLEAN NOT NULL DEFAULT false,
    `is_chronic` BOOLEAN NOT NULL DEFAULT false,
    `is_cdl` BOOLEAN NOT NULL DEFAULT false,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `batch_tracked` BOOLEAN NOT NULL DEFAULT true,
    `expiry_tracked` BOOLEAN NOT NULL DEFAULT true,
    `image_url` VARCHAR(191) NULL,
    `description` TEXT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `products_product_code_key`(`product_code`),
    UNIQUE INDEX `products_nappi_code_id_key`(`nappi_code_id`),
    INDEX `products_product_code_idx`(`product_code`),
    INDEX `products_category_idx`(`category`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product_suppliers` (
    `id` VARCHAR(191) NOT NULL,
    `product_id` VARCHAR(191) NOT NULL,
    `supplier_id` VARCHAR(191) NOT NULL,
    `supplier_code` VARCHAR(191) NULL,
    `is_primary` BOOLEAN NOT NULL DEFAULT false,
    `last_purchase_price` DOUBLE NULL,

    UNIQUE INDEX `product_suppliers_product_id_supplier_id_key`(`product_id`, `supplier_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `stock_batches` (
    `id` VARCHAR(191) NOT NULL,
    `batch_number` VARCHAR(191) NOT NULL,
    `product_id` VARCHAR(191) NOT NULL,
    `supplier_id` VARCHAR(191) NULL,
    `purchase_order_id` VARCHAR(191) NULL,
    `quantity_received` INTEGER NOT NULL,
    `quantity_remaining` INTEGER NOT NULL,
    `quantity_reserved` INTEGER NOT NULL DEFAULT 0,
    `cost_price_per_unit` DOUBLE NOT NULL,
    `selling_price_general` DOUBLE NOT NULL,
    `manufacturing_date` DATETIME(3) NULL,
    `expiry_date` DATETIME(3) NULL,
    `received_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `status` VARCHAR(191) NOT NULL DEFAULT 'ACTIVE',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `nappiCodeId` VARCHAR(191) NULL,

    INDEX `stock_batches_product_id_idx`(`product_id`),
    INDEX `stock_batches_batch_number_idx`(`batch_number`),
    INDEX `stock_batches_expiry_date_idx`(`expiry_date`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `stock_reservations` (
    `id` VARCHAR(191) NOT NULL,
    `batch_id` VARCHAR(191) NOT NULL,
    `prescription_id` VARCHAR(191) NULL,
    `appointment_id` VARCHAR(191) NULL,
    `quantity` INTEGER NOT NULL,
    `reserved_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `expires_at` DATETIME(3) NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'ACTIVE',

    INDEX `stock_reservations_batch_id_idx`(`batch_id`),
    INDEX `stock_reservations_prescription_id_idx`(`prescription_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `stock_consumption` (
    `id` VARCHAR(191) NOT NULL,
    `batch_id` VARCHAR(191) NOT NULL,
    `prescription_id` VARCHAR(191) NULL,
    `appointment_id` VARCHAR(191) NULL,
    `doctor_id` VARCHAR(191) NULL,
    `department_id` VARCHAR(191) NULL,
    `quantity` INTEGER NOT NULL,
    `unit_price` DOUBLE NOT NULL,
    `total_amount` DOUBLE NOT NULL,
    `consumed_by` VARCHAR(191) NULL,
    `consumed_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `notes` TEXT NULL,
    `productId` VARCHAR(191) NULL,

    INDEX `stock_consumption_batch_id_idx`(`batch_id`),
    INDEX `stock_consumption_prescription_id_idx`(`prescription_id`),
    INDEX `stock_consumption_appointment_id_idx`(`appointment_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `purchase_orders` (
    `id` VARCHAR(191) NOT NULL,
    `po_number` VARCHAR(191) NOT NULL,
    `supplier_id` VARCHAR(191) NOT NULL,
    `order_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `expected_date` DATETIME(3) NULL,
    `delivery_date` DATETIME(3) NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'DRAFT',
    `total_amount` DOUBLE NULL,
    `vat_amount` DOUBLE NULL,
    `grand_total` DOUBLE NULL,
    `notes` TEXT NULL,
    `created_by` VARCHAR(191) NULL,
    `approved_by` VARCHAR(191) NULL,
    `approved_at` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `purchase_orders_po_number_key`(`po_number`),
    INDEX `purchase_orders_po_number_idx`(`po_number`),
    INDEX `purchase_orders_supplier_id_idx`(`supplier_id`),
    INDEX `purchase_orders_status_idx`(`status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `purchase_order_items` (
    `id` VARCHAR(191) NOT NULL,
    `po_id` VARCHAR(191) NOT NULL,
    `product_id` VARCHAR(191) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `unit_price` DOUBLE NOT NULL,
    `total_price` DOUBLE NOT NULL,
    `received_quantity` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `goods_receipt_notes` (
    `id` VARCHAR(191) NOT NULL,
    `grn_number` VARCHAR(191) NOT NULL,
    `po_id` VARCHAR(191) NULL,
    `received_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `received_by` VARCHAR(191) NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'DRAFT',
    `notes` TEXT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `goods_receipt_notes_grn_number_key`(`grn_number`),
    INDEX `goods_receipt_notes_grn_number_idx`(`grn_number`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `goods_receipt_items` (
    `id` VARCHAR(191) NOT NULL,
    `grn_id` VARCHAR(191) NOT NULL,
    `product_id` VARCHAR(191) NOT NULL,
    `po_item_id` VARCHAR(191) NULL,
    `batch_number` VARCHAR(191) NOT NULL,
    `quantity_received` INTEGER NOT NULL,
    `quantity_accepted` INTEGER NOT NULL,
    `quantity_rejected` INTEGER NOT NULL DEFAULT 0,
    `reject_reason` VARCHAR(191) NULL,
    `manufacturing_date` DATETIME(3) NULL,
    `expiry_date` DATETIME(3) NULL,
    `cost_price_per_unit` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `stock_transfers` (
    `id` VARCHAR(191) NOT NULL,
    `transfer_number` VARCHAR(191) NOT NULL,
    `from_department` VARCHAR(191) NULL,
    `to_department` VARCHAR(191) NULL,
    `from_doctor_id` VARCHAR(191) NULL,
    `to_doctor_id` VARCHAR(191) NULL,
    `transfer_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `status` VARCHAR(191) NOT NULL DEFAULT 'PENDING',
    `requested_by` VARCHAR(191) NULL,
    `approved_by` VARCHAR(191) NULL,
    `notes` TEXT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `stock_transfers_transfer_number_key`(`transfer_number`),
    INDEX `stock_transfers_transfer_number_idx`(`transfer_number`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `stock_transfer_items` (
    `id` VARCHAR(191) NOT NULL,
    `transfer_id` VARCHAR(191) NOT NULL,
    `batch_id` VARCHAR(191) NOT NULL,
    `product_id` VARCHAR(191) NOT NULL,
    `quantity` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `stock_adjustments` (
    `id` VARCHAR(191) NOT NULL,
    `adjustment_number` VARCHAR(191) NOT NULL,
    `batch_id` VARCHAR(191) NOT NULL,
    `product_id` VARCHAR(191) NOT NULL,
    `adjustment_type` VARCHAR(191) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `reason` TEXT NOT NULL,
    `adjusted_by` VARCHAR(191) NULL,
    `approved_by` VARCHAR(191) NULL,
    `adjusted_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `stock_adjustments_adjustment_number_key`(`adjustment_number`),
    INDEX `stock_adjustments_batch_id_idx`(`batch_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `stock_reorder_requests` (
    `id` VARCHAR(191) NOT NULL,
    `product_id` VARCHAR(191) NOT NULL,
    `current_stock` INTEGER NOT NULL,
    `reorder_level` INTEGER NOT NULL,
    `reorder_quantity` INTEGER NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'PENDING',
    `requested_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `processed_at` DATETIME(3) NULL,

    INDEX `stock_reorder_requests_product_id_idx`(`product_id`),
    INDEX `stock_reorder_requests_status_idx`(`status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ai_consultation_summaries` (
    `id` VARCHAR(191) NOT NULL,
    `appointment_id` VARCHAR(191) NOT NULL,
    `summary` LONGTEXT NOT NULL,
    `key_findings` JSON NULL,
    `recommendations` JSON NULL,
    `prescriptions` JSON NULL,
    `diagnoses` JSON NULL,
    `confidence` DOUBLE NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `ai_consultation_summaries_appointment_id_key`(`appointment_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `invites` (
    `id` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `first_name` VARCHAR(191) NULL,
    `last_name` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NULL,
    `patient_id` VARCHAR(191) NULL,
    `doctor_id` VARCHAR(191) NOT NULL,
    `appointment_date` DATETIME(3) NOT NULL,
    `appointment_slot` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'PENDING',
    `expires_at` DATETIME(3) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `invites_token_key`(`token`),
    INDEX `invites_token_idx`(`token`),
    INDEX `invites_status_idx`(`status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `audit_logs` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NULL,
    `user_type` VARCHAR(191) NULL,
    `action` VARCHAR(191) NOT NULL,
    `entity_type` VARCHAR(191) NOT NULL,
    `entity_id` VARCHAR(191) NOT NULL,
    `old_values` JSON NULL,
    `new_values` JSON NULL,
    `ip_address` VARCHAR(191) NULL,
    `user_agent` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `audit_logs_entity_type_entity_id_idx`(`entity_type`, `entity_id`),
    INDEX `audit_logs_user_id_idx`(`user_id`),
    INDEX `audit_logs_action_idx`(`action`),
    INDEX `audit_logs_created_at_idx`(`created_at`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `era_providers` (
    `id` VARCHAR(191) NOT NULL,
    `era_id` VARCHAR(191) NOT NULL,
    `doctor_id` VARCHAR(191) NOT NULL,
    `provider_number` VARCHAR(191) NOT NULL,
    `provider_name` VARCHAR(191) NOT NULL,
    `provider_group` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `era_providers_era_id_doctor_id_key`(`era_id`, `doctor_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tariff_modifiers` ADD CONSTRAINT `tariff_modifiers_tariff_code_id_fkey` FOREIGN KEY (`tariff_code_id`) REFERENCES `tariff_codes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tariff_modifiers` ADD CONSTRAINT `tariff_modifiers_modifier_id_fkey` FOREIGN KEY (`modifier_id`) REFERENCES `modifier_codes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `clinical_sub_types` ADD CONSTRAINT `clinical_sub_types_clinical_type_id_fkey` FOREIGN KEY (`clinical_type_id`) REFERENCES `clinical_test_types`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `practice_disciplines` ADD CONSTRAINT `practice_disciplines_practice_id_fkey` FOREIGN KEY (`practice_id`) REFERENCES `practices`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `practice_specializations` ADD CONSTRAINT `practice_specializations_practice_id_fkey` FOREIGN KEY (`practice_id`) REFERENCES `practices`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `practice_locations` ADD CONSTRAINT `practice_locations_practice_id_fkey` FOREIGN KEY (`practice_id`) REFERENCES `practices`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `practice_working_hours` ADD CONSTRAINT `practice_working_hours_practice_id_fkey` FOREIGN KEY (`practice_id`) REFERENCES `practices`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bank_details` ADD CONSTRAINT `bank_details_practice_id_fkey` FOREIGN KEY (`practice_id`) REFERENCES `practices`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `practice_contracts` ADD CONSTRAINT `practice_contracts_practice_id_fkey` FOREIGN KEY (`practice_id`) REFERENCES `practices`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `practice_documents` ADD CONSTRAINT `practice_documents_practice_id_fkey` FOREIGN KEY (`practice_id`) REFERENCES `practices`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `doctors` ADD CONSTRAINT `doctors_council_type_id_fkey` FOREIGN KEY (`council_type_id`) REFERENCES `council_types`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `doctor_practices` ADD CONSTRAINT `doctor_practices_doctor_id_fkey` FOREIGN KEY (`doctor_id`) REFERENCES `doctors`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `doctor_practices` ADD CONSTRAINT `doctor_practices_practice_id_fkey` FOREIGN KEY (`practice_id`) REFERENCES `practices`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `doctor_contracts` ADD CONSTRAINT `doctor_contracts_doctor_id_fkey` FOREIGN KEY (`doctor_id`) REFERENCES `doctors`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `doctor_availability` ADD CONSTRAINT `doctor_availability_doctor_id_fkey` FOREIGN KEY (`doctor_id`) REFERENCES `doctors`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `doctor_time_ranges` ADD CONSTRAINT `doctor_time_ranges_doctor_id_fkey` FOREIGN KEY (`doctor_id`) REFERENCES `doctors`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `patient_scheme_details` ADD CONSTRAINT `patient_scheme_details_patient_id_fkey` FOREIGN KEY (`patient_id`) REFERENCES `patients`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `patient_scheme_details` ADD CONSTRAINT `patient_scheme_details_scheme_option_id_fkey` FOREIGN KEY (`scheme_option_id`) REFERENCES `scheme_options`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `patient_documents` ADD CONSTRAINT `patient_documents_patient_id_fkey` FOREIGN KEY (`patient_id`) REFERENCES `patients`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `patient_reports` ADD CONSTRAINT `patient_reports_patient_id_fkey` FOREIGN KEY (`patient_id`) REFERENCES `patients`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `patient_reports` ADD CONSTRAINT `patient_reports_appointment_id_fkey` FOREIGN KEY (`appointment_id`) REFERENCES `appointments`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `appointments` ADD CONSTRAINT `appointments_patient_id_fkey` FOREIGN KEY (`patient_id`) REFERENCES `patients`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `appointments` ADD CONSTRAINT `appointments_doctor_id_fkey` FOREIGN KEY (`doctor_id`) REFERENCES `doctors`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `appointments` ADD CONSTRAINT `appointments_practice_location_id_fkey` FOREIGN KEY (`practice_location_id`) REFERENCES `practice_locations`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `referrals` ADD CONSTRAINT `referrals_appointment_id_fkey` FOREIGN KEY (`appointment_id`) REFERENCES `appointments`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `referrals` ADD CONSTRAINT `referrals_new_appointment_id_fkey` FOREIGN KEY (`new_appointment_id`) REFERENCES `appointments`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `diagnosis_records` ADD CONSTRAINT `diagnosis_records_appointment_id_fkey` FOREIGN KEY (`appointment_id`) REFERENCES `appointments`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `diagnosis_records` ADD CONSTRAINT `diagnosis_records_icd_code_id_fkey` FOREIGN KEY (`icd_code_id`) REFERENCES `icd10_codes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `diagnosis_records` ADD CONSTRAINT `diagnosis_records_patientId_fkey` FOREIGN KEY (`patientId`) REFERENCES `patients`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `procedure_records` ADD CONSTRAINT `procedure_records_appointment_id_fkey` FOREIGN KEY (`appointment_id`) REFERENCES `appointments`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `procedure_records` ADD CONSTRAINT `procedure_records_tariff_code_id_fkey` FOREIGN KEY (`tariff_code_id`) REFERENCES `tariff_codes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `procedure_records` ADD CONSTRAINT `procedure_records_icd_code_id_fkey` FOREIGN KEY (`icd_code_id`) REFERENCES `icd10_codes`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `procedure_records` ADD CONSTRAINT `procedure_records_patientId_fkey` FOREIGN KEY (`patientId`) REFERENCES `patients`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `procedure_modifiers` ADD CONSTRAINT `procedure_modifiers_procedure_record_id_fkey` FOREIGN KEY (`procedure_record_id`) REFERENCES `procedure_records`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `procedure_modifiers` ADD CONSTRAINT `procedure_modifiers_modifier_code_id_fkey` FOREIGN KEY (`modifier_code_id`) REFERENCES `modifier_codes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `clinical_details` ADD CONSTRAINT `clinical_details_appointment_id_fkey` FOREIGN KEY (`appointment_id`) REFERENCES `appointments`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `clinical_details` ADD CONSTRAINT `clinical_details_claim_item_id_fkey` FOREIGN KEY (`claim_item_id`) REFERENCES `claim_items`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `clinical_details` ADD CONSTRAINT `clinical_details_clinical_type_id_fkey` FOREIGN KEY (`clinical_type_id`) REFERENCES `clinical_test_types`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `clinical_details` ADD CONSTRAINT `clinical_details_clinical_sub_type_id_fkey` FOREIGN KEY (`clinical_sub_type_id`) REFERENCES `clinical_sub_types`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `prescriptions` ADD CONSTRAINT `prescriptions_appointment_id_fkey` FOREIGN KEY (`appointment_id`) REFERENCES `appointments`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `prescriptions` ADD CONSTRAINT `prescriptions_patient_id_fkey` FOREIGN KEY (`patient_id`) REFERENCES `patients`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `prescriptions` ADD CONSTRAINT `prescriptions_doctor_id_fkey` FOREIGN KEY (`doctor_id`) REFERENCES `doctors`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `prescription_items` ADD CONSTRAINT `prescription_items_prescription_id_fkey` FOREIGN KEY (`prescription_id`) REFERENCES `prescriptions`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `prescription_items` ADD CONSTRAINT `prescription_items_nappi_code_id_fkey` FOREIGN KEY (`nappi_code_id`) REFERENCES `nappi_codes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `prescription_items` ADD CONSTRAINT `prescription_items_icd_code_id_fkey` FOREIGN KEY (`icd_code_id`) REFERENCES `icd10_codes`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `prescription_items` ADD CONSTRAINT `prescription_items_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bills` ADD CONSTRAINT `bills_appointment_id_fkey` FOREIGN KEY (`appointment_id`) REFERENCES `appointments`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bills` ADD CONSTRAINT `bills_patient_id_fkey` FOREIGN KEY (`patient_id`) REFERENCES `patients`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bill_items` ADD CONSTRAINT `bill_items_bill_id_fkey` FOREIGN KEY (`bill_id`) REFERENCES `bills`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bill_items` ADD CONSTRAINT `bill_items_nappi_code_id_fkey` FOREIGN KEY (`nappi_code_id`) REFERENCES `nappi_codes`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bill_items` ADD CONSTRAINT `bill_items_icd_code_id_fkey` FOREIGN KEY (`icd_code_id`) REFERENCES `icd10_codes`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bill_item_diagnoses` ADD CONSTRAINT `bill_item_diagnoses_bill_item_id_fkey` FOREIGN KEY (`bill_item_id`) REFERENCES `bill_items`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bill_item_diagnoses` ADD CONSTRAINT `bill_item_diagnoses_icd_code_id_fkey` FOREIGN KEY (`icd_code_id`) REFERENCES `icd10_codes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bill_modifiers` ADD CONSTRAINT `bill_modifiers_bill_item_id_fkey` FOREIGN KEY (`bill_item_id`) REFERENCES `bill_items`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bill_modifiers` ADD CONSTRAINT `bill_modifiers_modifier_code_id_fkey` FOREIGN KEY (`modifier_code_id`) REFERENCES `modifier_codes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `claims` ADD CONSTRAINT `claims_bill_id_fkey` FOREIGN KEY (`bill_id`) REFERENCES `bills`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `claims` ADD CONSTRAINT `claims_appointment_id_fkey` FOREIGN KEY (`appointment_id`) REFERENCES `appointments`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `claims` ADD CONSTRAINT `claims_patient_id_fkey` FOREIGN KEY (`patient_id`) REFERENCES `patients`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `claims` ADD CONSTRAINT `claims_doctor_id_fkey` FOREIGN KEY (`doctor_id`) REFERENCES `doctors`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `claims` ADD CONSTRAINT `claims_practice_id_fkey` FOREIGN KEY (`practice_id`) REFERENCES `practices`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `claims` ADD CONSTRAINT `claims_scheme_option_id_fkey` FOREIGN KEY (`scheme_option_id`) REFERENCES `scheme_options`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `claims` ADD CONSTRAINT `claims_transaction_code_id_fkey` FOREIGN KEY (`transaction_code_id`) REFERENCES `transaction_codes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `claims` ADD CONSTRAINT `claims_reversal_claim_id_fkey` FOREIGN KEY (`reversal_claim_id`) REFERENCES `claims`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `claim_items` ADD CONSTRAINT `claim_items_claim_id_fkey` FOREIGN KEY (`claim_id`) REFERENCES `claims`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `claim_items` ADD CONSTRAINT `claim_items_bill_item_id_fkey` FOREIGN KEY (`bill_item_id`) REFERENCES `bill_items`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `claim_items` ADD CONSTRAINT `claim_items_item_type_id_fkey` FOREIGN KEY (`item_type_id`) REFERENCES `item_types`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `claim_items` ADD CONSTRAINT `claim_items_coding_set_id_fkey` FOREIGN KEY (`coding_set_id`) REFERENCES `coding_sets`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `claim_items` ADD CONSTRAINT `claim_items_nappi_code_id_fkey` FOREIGN KEY (`nappi_code_id`) REFERENCES `nappi_codes`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `claim_items` ADD CONSTRAINT `claim_items_tariff_code_id_fkey` FOREIGN KEY (`tariff_code_id`) REFERENCES `tariff_codes`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `claim_item_modifiers` ADD CONSTRAINT `claim_item_modifiers_claim_item_id_fkey` FOREIGN KEY (`claim_item_id`) REFERENCES `claim_items`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `claim_item_modifiers` ADD CONSTRAINT `claim_item_modifiers_modifier_code_id_fkey` FOREIGN KEY (`modifier_code_id`) REFERENCES `modifier_codes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `claim_item_diagnoses` ADD CONSTRAINT `claim_item_diagnoses_claim_item_id_fkey` FOREIGN KEY (`claim_item_id`) REFERENCES `claim_items`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `claim_item_diagnoses` ADD CONSTRAINT `claim_item_diagnoses_icd_code_id_fkey` FOREIGN KEY (`icd_code_id`) REFERENCES `icd10_codes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `claim_item_benefits` ADD CONSTRAINT `claim_item_benefits_claim_item_id_fkey` FOREIGN KEY (`claim_item_id`) REFERENCES `claim_items`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `claim_item_benefits` ADD CONSTRAINT `claim_item_benefits_benefit_type_id_fkey` FOREIGN KEY (`benefit_type_id`) REFERENCES `benefit_types`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `claim_scheme_details` ADD CONSTRAINT `claim_scheme_details_claim_id_fkey` FOREIGN KEY (`claim_id`) REFERENCES `claims`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `claim_scheme_details` ADD CONSTRAINT `claim_scheme_details_scheme_option_id_fkey` FOREIGN KEY (`scheme_option_id`) REFERENCES `scheme_options`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `claim_patients` ADD CONSTRAINT `claim_patients_claim_id_fkey` FOREIGN KEY (`claim_id`) REFERENCES `claims`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `claim_patients` ADD CONSTRAINT `claim_patients_patient_id_fkey` FOREIGN KEY (`patient_id`) REFERENCES `patients`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `claim_financials` ADD CONSTRAINT `claim_financials_claim_id_fkey` FOREIGN KEY (`claim_id`) REFERENCES `claims`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `claim_financials` ADD CONSTRAINT `claim_financials_pricingTariffIndicatorId_fkey` FOREIGN KEY (`pricingTariffIndicatorId`) REFERENCES `pricing_tariff_indicators`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `item_financials` ADD CONSTRAINT `item_financials_claim_item_id_fkey` FOREIGN KEY (`claim_item_id`) REFERENCES `claim_items`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `item_financials` ADD CONSTRAINT `item_financials_pricing_tariff_ind_id_fkey` FOREIGN KEY (`pricing_tariff_ind_id`) REFERENCES `pricing_tariff_indicators`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `eras` ADD CONSTRAINT `eras_practice_id_fkey` FOREIGN KEY (`practice_id`) REFERENCES `practices`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `era_files` ADD CONSTRAINT `era_files_era_id_fkey` FOREIGN KEY (`era_id`) REFERENCES `eras`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `scheme_eras` ADD CONSTRAINT `scheme_eras_era_id_fkey` FOREIGN KEY (`era_id`) REFERENCES `eras`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `era_banks` ADD CONSTRAINT `era_banks_scheme_era_id_fkey` FOREIGN KEY (`scheme_era_id`) REFERENCES `scheme_eras`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `era_balances` ADD CONSTRAINT `era_balances_scheme_era_id_fkey` FOREIGN KEY (`scheme_era_id`) REFERENCES `scheme_eras`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `era_claims` ADD CONSTRAINT `era_claims_scheme_era_id_fkey` FOREIGN KEY (`scheme_era_id`) REFERENCES `scheme_eras`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `era_claims` ADD CONSTRAINT `era_claims_claim_id_fkey` FOREIGN KEY (`claim_id`) REFERENCES `claims`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `era_claim_patients` ADD CONSTRAINT `era_claim_patients_era_claim_id_fkey` FOREIGN KEY (`era_claim_id`) REFERENCES `era_claims`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `era_claim_patients` ADD CONSTRAINT `era_claim_patients_patient_id_fkey` FOREIGN KEY (`patient_id`) REFERENCES `patients`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `era_claim_financials` ADD CONSTRAINT `era_claim_financials_era_claim_id_fkey` FOREIGN KEY (`era_claim_id`) REFERENCES `era_claims`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `era_claim_lines` ADD CONSTRAINT `era_claim_lines_era_claim_id_fkey` FOREIGN KEY (`era_claim_id`) REFERENCES `era_claims`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `era_line_patients` ADD CONSTRAINT `era_line_patients_era_line_id_fkey` FOREIGN KEY (`era_line_id`) REFERENCES `era_claim_lines`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `era_line_patients` ADD CONSTRAINT `era_line_patients_patient_id_fkey` FOREIGN KEY (`patient_id`) REFERENCES `patients`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `era_line_financials` ADD CONSTRAINT `era_line_financials_era_line_id_fkey` FOREIGN KEY (`era_line_id`) REFERENCES `era_claim_lines`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `era_line_modifiers` ADD CONSTRAINT `era_line_modifiers_era_line_id_fkey` FOREIGN KEY (`era_line_id`) REFERENCES `era_claim_lines`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `era_claim_deductions` ADD CONSTRAINT `era_claim_deductions_era_claim_id_fkey` FOREIGN KEY (`era_claim_id`) REFERENCES `era_claims`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `era_claim_deductions` ADD CONSTRAINT `era_claim_deductions_deduction_type_id_fkey` FOREIGN KEY (`deduction_type_id`) REFERENCES `deduction_types`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `era_line_deductions` ADD CONSTRAINT `era_line_deductions_era_line_id_fkey` FOREIGN KEY (`era_line_id`) REFERENCES `era_claim_lines`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `era_line_deductions` ADD CONSTRAINT `era_line_deductions_deduction_type_id_fkey` FOREIGN KEY (`deduction_type_id`) REFERENCES `deduction_types`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `era_claim_messages` ADD CONSTRAINT `era_claim_messages_era_claim_id_fkey` FOREIGN KEY (`era_claim_id`) REFERENCES `era_claims`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `era_line_messages` ADD CONSTRAINT `era_line_messages_era_line_id_fkey` FOREIGN KEY (`era_line_id`) REFERENCES `era_claim_lines`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `era_adjustments` ADD CONSTRAINT `era_adjustments_scheme_era_id_fkey` FOREIGN KEY (`scheme_era_id`) REFERENCES `scheme_eras`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `doctor_details` ADD CONSTRAINT `doctor_details_doctor_id_fkey` FOREIGN KEY (`doctor_id`) REFERENCES `doctors`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `doctor_details` ADD CONSTRAINT `doctor_details_claim_id_fkey` FOREIGN KEY (`claim_id`) REFERENCES `claims`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `doctor_details` ADD CONSTRAINT `doctor_details_place_of_service_code_id_fkey` FOREIGN KEY (`place_of_service_code_id`) REFERENCES `place_of_service_codes`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `doctor_details` ADD CONSTRAINT `doctor_details_disposal_code_id_fkey` FOREIGN KEY (`disposal_code_id`) REFERENCES `disposal_codes`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bhf_details` ADD CONSTRAINT `bhf_details_claim_id_fkey` FOREIGN KEY (`claim_id`) REFERENCES `claims`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bhf_details` ADD CONSTRAINT `bhf_details_prescribing_id_fkey` FOREIGN KEY (`prescribing_id`) REFERENCES `doctors`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bhf_details` ADD CONSTRAINT `bhf_details_referring_id_fkey` FOREIGN KEY (`referring_id`) REFERENCES `doctors`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bhf_details` ADD CONSTRAINT `bhf_details_admitting_id_fkey` FOREIGN KEY (`admitting_id`) REFERENCES `doctors`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bhf_details` ADD CONSTRAINT `bhf_details_doctorId_fkey` FOREIGN KEY (`doctorId`) REFERENCES `doctors`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `hpc_details` ADD CONSTRAINT `hpc_details_bhf_detail_id_fkey` FOREIGN KEY (`bhf_detail_id`) REFERENCES `bhf_details`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `additional_bhf_infos` ADD CONSTRAINT `additional_bhf_infos_claim_item_id_fkey` FOREIGN KEY (`claim_item_id`) REFERENCES `claim_items`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `assistants` ADD CONSTRAINT `assistants_claim_item_id_fkey` FOREIGN KEY (`claim_item_id`) REFERENCES `claim_items`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `assistants` ADD CONSTRAINT `assistants_doctor_id_fkey` FOREIGN KEY (`doctor_id`) REFERENCES `doctors`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `assistants` ADD CONSTRAINT `assistants_council_type_id_fkey` FOREIGN KEY (`council_type_id`) REFERENCES `council_types`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `other_details` ADD CONSTRAINT `other_details_claim_id_fkey` FOREIGN KEY (`claim_id`) REFERENCES `claims`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `treatment_details` ADD CONSTRAINT `treatment_details_claim_item_id_fkey` FOREIGN KEY (`claim_item_id`) REFERENCES `claim_items`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `refill_details` ADD CONSTRAINT `refill_details_claim_item_id_fkey` FOREIGN KEY (`claim_item_id`) REFERENCES `claim_items`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dental_details` ADD CONSTRAINT `dental_details_claim_item_id_fkey` FOREIGN KEY (`claim_item_id`) REFERENCES `claim_items`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dental_teeth` ADD CONSTRAINT `dental_teeth_dental_detail_id_fkey` FOREIGN KEY (`dental_detail_id`) REFERENCES `dental_details`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dental_lab_details` ADD CONSTRAINT `dental_lab_details_claim_item_id_fkey` FOREIGN KEY (`claim_item_id`) REFERENCES `claim_items`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dental_lab_details` ADD CONSTRAINT `dental_lab_details_council_type_id_fkey` FOREIGN KEY (`council_type_id`) REFERENCES `council_types`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `optometry_details` ADD CONSTRAINT `optometry_details_claim_item_id_fkey` FOREIGN KEY (`claim_item_id`) REFERENCES `claim_items`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `optometry_exams` ADD CONSTRAINT `optometry_exams_optometry_detail_id_fkey` FOREIGN KEY (`optometry_detail_id`) REFERENCES `optometry_details`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `optometry_lenses` ADD CONSTRAINT `optometry_lenses_optometry_detail_id_fkey` FOREIGN KEY (`optometry_detail_id`) REFERENCES `optometry_details`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `optometry_frames` ADD CONSTRAINT `optometry_frames_optometry_detail_id_fkey` FOREIGN KEY (`optometry_detail_id`) REFERENCES `optometry_details`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `products` ADD CONSTRAINT `products_nappi_code_id_fkey` FOREIGN KEY (`nappi_code_id`) REFERENCES `nappi_codes`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product_suppliers` ADD CONSTRAINT `product_suppliers_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product_suppliers` ADD CONSTRAINT `product_suppliers_supplier_id_fkey` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `stock_batches` ADD CONSTRAINT `stock_batches_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `stock_batches` ADD CONSTRAINT `stock_batches_supplier_id_fkey` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `stock_batches` ADD CONSTRAINT `stock_batches_purchase_order_id_fkey` FOREIGN KEY (`purchase_order_id`) REFERENCES `purchase_orders`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `stock_batches` ADD CONSTRAINT `stock_batches_nappiCodeId_fkey` FOREIGN KEY (`nappiCodeId`) REFERENCES `nappi_codes`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `stock_reservations` ADD CONSTRAINT `stock_reservations_batch_id_fkey` FOREIGN KEY (`batch_id`) REFERENCES `stock_batches`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `stock_consumption` ADD CONSTRAINT `stock_consumption_batch_id_fkey` FOREIGN KEY (`batch_id`) REFERENCES `stock_batches`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `stock_consumption` ADD CONSTRAINT `stock_consumption_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `purchase_orders` ADD CONSTRAINT `purchase_orders_supplier_id_fkey` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `purchase_order_items` ADD CONSTRAINT `purchase_order_items_po_id_fkey` FOREIGN KEY (`po_id`) REFERENCES `purchase_orders`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `purchase_order_items` ADD CONSTRAINT `purchase_order_items_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `goods_receipt_notes` ADD CONSTRAINT `goods_receipt_notes_po_id_fkey` FOREIGN KEY (`po_id`) REFERENCES `purchase_orders`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `goods_receipt_items` ADD CONSTRAINT `goods_receipt_items_grn_id_fkey` FOREIGN KEY (`grn_id`) REFERENCES `goods_receipt_notes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `goods_receipt_items` ADD CONSTRAINT `goods_receipt_items_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `stock_transfer_items` ADD CONSTRAINT `stock_transfer_items_transfer_id_fkey` FOREIGN KEY (`transfer_id`) REFERENCES `stock_transfers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `stock_transfer_items` ADD CONSTRAINT `stock_transfer_items_batch_id_fkey` FOREIGN KEY (`batch_id`) REFERENCES `stock_batches`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `stock_transfer_items` ADD CONSTRAINT `stock_transfer_items_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `stock_adjustments` ADD CONSTRAINT `stock_adjustments_batch_id_fkey` FOREIGN KEY (`batch_id`) REFERENCES `stock_batches`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `stock_adjustments` ADD CONSTRAINT `stock_adjustments_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `stock_reorder_requests` ADD CONSTRAINT `stock_reorder_requests_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ai_consultation_summaries` ADD CONSTRAINT `ai_consultation_summaries_appointment_id_fkey` FOREIGN KEY (`appointment_id`) REFERENCES `appointments`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `era_providers` ADD CONSTRAINT `era_providers_era_id_fkey` FOREIGN KEY (`era_id`) REFERENCES `eras`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `era_providers` ADD CONSTRAINT `era_providers_doctor_id_fkey` FOREIGN KEY (`doctor_id`) REFERENCES `doctors`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
