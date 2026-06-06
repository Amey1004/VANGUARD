<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method.']);
    exit;
}

$form_type = $_POST['form_type'] ?? '';

$to = [EMAIL_ADDRESS]; // Recipient email address

if ($form_type === 'inquiry') {
    $company_name = htmlspecialchars($_POST['company_name'] ?? '');
    $company_reg = htmlspecialchars($_POST['company_reg'] ?? '');
    $contact_person = htmlspecialchars($_POST['contact_person'] ?? '');
    $job_role = htmlspecialchars($_POST['job_role'] ?? '');
    $email = htmlspecialchars($_POST['email'] ?? '');
    $product = htmlspecialchars($_POST['product'] ?? '');
    $grade = htmlspecialchars($_POST['grade'] ?? '');
    $volume = htmlspecialchars($_POST['volume'] ?? '');
    $packaging = htmlspecialchars($_POST['packaging'] ?? '');
    $incoterms = htmlspecialchars($_POST['incoterms'] ?? '');
    $application = htmlspecialchars($_POST['application'] ?? '');
    $port = htmlspecialchars($_POST['port'] ?? '');
    
    $compliance = isset($_POST['compliance']) && is_array($_POST['compliance']) 
                  ? implode(", ", array_map('htmlspecialchars', $_POST['compliance'])) : 'None';

    $subject = "New B2B Inquiry: $company_name";
    
    $message = "You have received a new B2B Inquiry.\n\n";
    $message .= "--- Company Details ---\n";
    $message .= "Company Name: $company_name\n";
    $message .= "Registration No: $company_reg\n";
    $message .= "Contact Person: $contact_person\n";
    $message .= "Job Role: $job_role\n";
    $message .= "Email: $email\n\n";
    $message .= "--- Product Requirements ---\n";
    $message .= "Product: $product\n";
    $message .= "Grade: $grade\n";
    $message .= "Volume: $volume MT\n";
    $message .= "Packaging: $packaging\n";
    $message .= "Incoterms: $incoterms\n";
    $message .= "Application/End-Use: $application\n\n";
    $message .= "--- Logistics & Compliance ---\n";
    $message .= "Target Port: $port\n";
    $message .= "Compliance Requirements: $compliance\n";

} elseif ($form_type === 'contact') {
    $first_name = htmlspecialchars($_POST['first_name'] ?? '');
    $last_name = htmlspecialchars($_POST['last_name'] ?? '');
    $email = htmlspecialchars($_POST['email'] ?? '');
    $intent = htmlspecialchars($_POST['intent'] ?? '');
    $details = htmlspecialchars($_POST['message'] ?? '');

    $subject = "New Contact Message: $intent";
    
    $message = "You have received a new contact message.\n\n";
    $message .= "Name: $first_name $last_name\n";
    $message .= "Email: $email\n";
    $message .= "Intent: $intent\n\n";
    $message .= "Requirements Details:\n$details\n";
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid form type.']);
    exit;
}

$headers = "From: no-reply@vanguardglobaltrade.com\r\n";
$headers .= "Reply-To: $email\r\n";

// Use mail() function
if (mail($to, $subject, $message, $headers)) {
    echo json_encode(['status' => 'success', 'message' => 'Message sent successfully.']);
} else {
    // Return error, but for testing purposes we can send success if we want to bypass server errors.
    // However, it's better to show the real status.
    echo json_encode(['status' => 'error', 'message' => 'Failed to send the email. Ensure your server is configured to send emails.']);
}
?>
