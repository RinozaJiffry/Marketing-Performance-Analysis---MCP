# 📊 Marketing Performance Analysis — Model Context Protocol (MCP)

Welcome to the **Marketing Performance Analysis - MCP** project!  
This demo application showcases how to integrate the **Model Context Protocol (MCP)** into an AI assistant to ensure **role-based access control** over sensitive marketing data.

> 🛡️ **MCP** ensures that the right people see the right data — and nothing more.

---

## 🎯 Project Overview

In real-world organizations, not every team member should have access to all marketing insights. This project simulates how MCP works to filter AI responses based on user roles such as **Executive**, **Manager**, or **Regular User**.

This demo:
- **Injects contextual filtering** into AI queries
- Demonstrates **secure and personalized responses**
- Prevents accidental data exposure of KPIs like acquisition costs, profit margins, and strategic plans

---

## 🔍 Use Case

### Scenario:
An employee asks the AI:  
> "Show me Q1 marketing performance data."

### Without MCP:
All users might receive access to **sensitive** information regardless of their roles.

### With MCP:
Responses vary by role:
- **Regular User**: High-level summary of campaign performance
- **Manager**: Summary + Channel-level analytics
- **Executive**: Full data including financial metrics and strategic insights

---

## 🏗️ Tech Stack

- **Node.js/Exprees** (Backend)
- **OpenAI API / LLM integration** (Simulated)
- **JWT** for role-based identity
- **Role-based Filtering Middleware**
- **React** (for UI) – *optional / planned for extension*

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/RinozaJiffry/Marketing-Performance-Analysis---MCP.git
cd Marketing-Performance-Analysis---MCP

### 2. Install Dependencies

```bash
npm install

### 3. Run the Server

```bash
npm run dev
