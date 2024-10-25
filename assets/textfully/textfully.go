package textfully

// Send sends an SMS message to the specified phone number
func Send(phoneNumber string, message string) {
	// This is a simulation - in a real implementation,
	// this would connect to an SMS service
	println("Sending SMS to", phoneNumber, ":", message)
}
