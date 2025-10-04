import pandas as pd
import yagmail

# Load Excel sheet
df = pd.read_excel("data.xlsx")

# Setup Gmail (your Gmail + app password)
yag = yagmail.SMTP("kavyporwal75@gmail.com", "ndzg dnzp gcmk tqhv")

# WhatsApp group + Google Form links
whatsapp_link = "https://chat.whatsapp.com/CpjCf5dYJIB29zA2HbiWZx?mode=ems_copy_t"
ppt_form_link = "https://forms.gle/BRBffNHVXu2Ypw5L9"

# Loop through each participant
for index, row in df.iterrows():
    name = row['Name']
    email = row['Email']
    idea = row['Title']

    subject = f"🎉 Congratulations {name}! You’re Selected for Round 2 of ThinkUp25"

    body = f"""
    Dear {name},

    Congratulations! 🎉  
    Your idea titled **"{idea}"** has been selected for the **2nd Round** of ThinkUp25.

    ✅ Next Steps:  
    1. Join our official WhatsApp group here: {whatsapp_link}  
    2. Submit your PPT using this Google Form: {ppt_form_link}  

    Please complete these steps at the earliest to confirm your participation.  

    We’re excited to see your amazing work in the next round! 🚀

    Best regards,  
    Team ThinkUp25
    """

    yag.send(to=email, subject=subject, contents=body)
    print(f"✅ Mail sent to {name} ({email})")