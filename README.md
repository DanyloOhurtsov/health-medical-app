# ClinicWave

**ClinicWave** is a healthcare patient management application that simplifies patient registration, appointment scheduling, and medical records management for clinics and healthcare providers. Built with modern web technologies, ClinicWave ensures seamless management of patient data, appointments, and communications through integrated SMS notifications.

## Introduction

ClinicWave is designed to allow patients to easily register, book, and manage their appointments with doctors. It features a comprehensive set of administrative tools for scheduling, confirming, and canceling appointments. With built-in SMS notifications, the platform ensures timely communication between patients and healthcare providers. Developed using Next.js, this platform offers a robust and responsive solution for clinics of all sizes.

If you're getting started and need assistance or face any bugs, join our active Discord community with over 34k+ members. It's a place where people help each other out.

## Tech Stack

-   **Next.js**: React framework for server-side rendering and static site generation.
-   **Appwrite**: Backend server for web, mobile, and flutter developers.
-   **TypeScript**: A typed superset of JavaScript that enhances code quality and maintainability.
-   **TailwindCSS**: Utility-first CSS framework for rapid UI development.
-   **ShadCN**: A component library for building scalable and responsive UI.
-   **Twilio**: A cloud communications platform for sending and receiving SMS notifications.

## Features

-   **Register as a Patient**: Users can sign up and create a personal profile as a patient.
-   **Book a New Appointment with Doctor**: Patients can schedule appointments with doctors at their convenience and can book multiple appointments.
-   **Manage Appointments on Admin Side**: Administrators can efficiently view and handle all scheduled appointments.
-   **Confirm/Schedule Appointment from Admin Side**: Admins can confirm and set appointment times to ensure they are properly scheduled.
-   **Cancel Appointment from Admin Side**: Administrators have the ability to cancel any appointment as needed.
-   **Send SMS on Appointment Confirmation**: Patients receive SMS notifications to confirm their appointment details.
-   **Complete Responsiveness**: The application works seamlessly on all device types and screen sizes.
-   **File Upload Using Appwrite Storage**: Users can upload and store files securely within the app using Appwrite storage services.
-   **Manage and Track Application Performance Using Sentry**: The application uses Sentry to monitor and track its performance and detect any errors.
-   **...and many more, including code architecture and reusability**.

## Installation

1. **Clone the Repository**:

    ```bash
    git clone https://github.com/
    ```

2. **Navigate to the Project Directory**:

    ```bash
    cd clinicwave
    ```

3. **Install Dependencies**:

    - If using `npm`:

    ```bash
    npm install
    ```

    - If using `yarn`:

    ```bash
    yarn install
    ```

4. **Run the Application**:
    - For development:
    ```bash
    npm run dev
    ```
    - For production build:
    ```bash
    npm run build
    ```

## Usage

-   **Patient Registration**: Use the "Register New Patient" button to access the registration form. Fill in the required details and submit.
-   **Appointment Scheduling**: Navigate to the "Appointments" tab to view, schedule, or edit appointments. Use the calendar view to easily manage patient schedules.
-   **Medical Records**: Access the "Medical Records" section to view, add, or update patient medical records. Use the search functionality for quick access.
-   **SMS Notifications**: Configure SMS notifications in the "Settings" section to send automated reminders and notifications to patients.

## Configuration

-   **Database Setup**: Configure your preferred database in the `config/database.js` file. The platform supports popular databases like MySQL, PostgreSQL, and MongoDB.
-   **SMS Service Integration**: Integrate your SMS service provider in the `config/sms.js` file. Supported providers include Twilio, Nexmo, and others.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For questions or support, please reach out to [ogurtsov.danylo@gmail.com](mailto:ogurtsov.danylo@gmail.com).
