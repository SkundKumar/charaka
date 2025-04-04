"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { FloatingNavbar } from "@/components/aceternity/floating-navbar"
import { Button } from "@/components/aceternity/button"
import { Input } from "@/components/aceternity/input"
import { Card3D } from "@/components/aceternity/3d-card"
import { ConfirmationCard } from "@/components/aceternity/confirmation-card"
import { formatAadharNo } from "@/lib/utils"

type UserType = "patient" | "student"

interface UserData {
  name: string
  dob: string
  gender: string
  address: string
  phone: string
  email: string
}

export default function RegisterPage() {
  const router = useRouter()
  const [userType, setUserType] = useState<UserType>("patient")
  const [aadharNumber, setAadharNumber] = useState("1234 5678 9012")
  const [email, setEmail] = useState("user@example.com")
  const [otp, setOtp] = useState("")
  const [step, setStep] = useState(1)
  const [aadharError, setAadharError] = useState("")
  const [emailError, setEmailError] = useState("")
  const [otpError, setOtpError] = useState("")
  const [showConfirmationModal, setShowConfirmationModal] = useState(false)
  const [generatedOtp, setGeneratedOtp] = useState("")

  const navItems = [
    { name: "Home", link: "/" },
    { name: "Features", link: "/#features" },
    { name: "How It Works", link: "/#how-it-works" },
    { name: "About", link: "/#about" },
  ]

  // Mock user data that would be fetched from Aadhar
  const [userData, setUserData] = useState<UserData>({
    name: "John Doe",
    dob: "1990-01-01",
    gender: "Male",
    address: "123 Main St, Delhi, India",
    phone: "9876543210",
    email: "",
  })

  // Generate a random 6-digit OTP when the component mounts
  useEffect(() => {
    const randomOtp = Math.floor(100000 + Math.random() * 900000).toString()
    setGeneratedOtp(randomOtp)
    console.log("Generated OTP:", randomOtp) // For demo purposes
  }, [])

  const handleAadharChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatAadharNo(e.target.value.slice(0, 14))
    setAadharNumber(formatted)
    setAadharError("")
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    setEmailError("")
  }

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6)
    setOtp(value)
    setOtpError("")
  }

  const handleSendOtp = () => {
    // For demo purposes, always proceed
    setStep(2)
    alert(`OTP sent! For demo purposes, use: ${generatedOtp}`)
  }

  const handleVerifyOtp = () => {
    if (otp.length === 0) {
      setOtpError("Please enter the OTP")
      return
    }

    // For demo purposes, allow any OTP
    setShowConfirmationModal(true)
  }

  const handleConfirmRegister = () => {
    // In a real app, you would register the user with an API
    router.push("/medical-info")
  }

  // For demo purposes, add a direct navigation button
  const renderDirectNavigationButton = () => (
    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">For demonstration purposes:</p>
      <Button variant="outline" className="w-full" onClick={() => router.push("/medical-info")}>
        Skip Verification & Continue
      </Button>
    </div>
  )

  return (
    <main className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <FloatingNavbar navItems={navItems} />

      <div className="flex-grow flex items-center justify-center p-4 mt-16">
        <div className="w-full max-w-4xl">
          <Card3D className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-xl">
            <div className="flex flex-col md:flex-row gap-8">
              {/* User Type Selection - Always visible */}
              <div className="md:w-1/3 space-y-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Select User Type</h2>
                <div className="grid grid-cols-1 gap-4">
                  <Button
                    variant={userType === "patient" ? "default" : "outline"}
                    className={userType === "patient" ? "bg-sky-600 hover:bg-sky-700" : ""}
                    onClick={() => setUserType("patient")}
                  >
                    Patient
                  </Button>
                  <Button variant="outline" className="opacity-50 cursor-not-allowed" disabled>
                    Doctor (Gov Only)
                  </Button>
                  <Button variant="outline" className="opacity-50 cursor-not-allowed" disabled>
                    Government (Gov Only)
                  </Button>
                  <Button
                    variant={userType === "student" ? "default" : "outline"}
                    className={userType === "student" ? "bg-sky-600 hover:bg-sky-700" : ""}
                    onClick={() => setUserType("student")}
                  >
                    Student
                  </Button>
                </div>
              </div>

              {/* Registration Form */}
              <div className="md:w-2/3 space-y-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create Your Account</h1>

                {/* Step 1: User Details */}
                {step === 1 && (
                  <div className="space-y-6">
                    <Input
                      label="Aadhar Number"
                      value={aadharNumber}
                      onChange={handleAadharChange}
                      placeholder="XXXX XXXX XXXX"
                      error={aadharError}
                    />

                    <Input
                      label="Email Address (Optional)"
                      value={email}
                      onChange={handleEmailChange}
                      placeholder="your@email.com"
                      error={emailError}
                      description="We'll send you a verification code"
                    />

                    <Button variant="pill" className="w-full bg-sky-600 hover:bg-sky-700" onClick={handleSendOtp}>
                      Send Verification Code
                    </Button>

                    {renderDirectNavigationButton()}
                  </div>
                )}

                {/* Step 2: OTP Verification */}
                {step === 2 && (
                  <div className="space-y-6">
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      A 6-digit verification code has been sent to your{" "}
                      {email ? "email" : "Aadhar-linked mobile number"}.
                    </p>

                    <Input
                      label="Verification Code"
                      value={otp}
                      onChange={handleOtpChange}
                      placeholder="6-digit code"
                      error={otpError}
                    />

                    <Button variant="pill" className="w-full bg-sky-600 hover:bg-sky-700" onClick={handleVerifyOtp}>
                      Verify & Continue
                    </Button>

                    <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                      Didn&apos;t receive code?
                      <button className="ml-1 text-sky-600 hover:text-sky-700" onClick={handleSendOtp}>
                        Resend
                      </button>
                    </p>

                    <button
                      className="w-full text-center text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                      onClick={() => setStep(1)}
                    >
                      Go Back
                    </button>

                    {renderDirectNavigationButton()}
                  </div>
                )}
              </div>
            </div>
          </Card3D>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <ConfirmationCard
            userData={{
              ...userData,
              email: email || "Not provided",
            }}
            onConfirm={handleConfirmRegister}
            onCancel={() => setShowConfirmationModal(false)}
          />
        </div>
      )}
    </main>
  )
}

