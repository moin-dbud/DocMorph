export const PLAN_FEATURES = {
    free: {
        bulkUpoad: false,
        priority: false,
        maxFileSizeMB: 5,
        allowedFormats: ["PDF", "JPG"],
    },
    pro: {
        bulkUpoad: false,
        priority: true,
        maxFileSizeMB: 20,
        allowedFormats: ["PDF", "JPG", "PNG"],
    },
    premium: {
        bulkUpoad: true,
        priority: true,
        maxFileSizeMB: 50,
        allowedFormats: ["PDF", "JPG", "PNG", "DOCX"],
    },
};