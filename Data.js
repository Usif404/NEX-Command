const commandsDB = [
  {
    id: 1,
    category: "file-management",
    system: "windows-cmd",
    command: "dir",
    syntax: "dir [drive:][path] [/p] [/w] [/a]",
    descriptionAr: "يعرض قائمة الملفات والمجلدات الفرعية في المسار المحدد.",
    descriptionEn: "Displays a list of files and subdirectories in a directory.",
    examplesAr: ["dir C:\\Users", "dir /p لعرض صفحة بصفحة", "dir *.txt لعرض الملفات النصية فقط"],
    examplesEn: ["dir C:\\Users", "dir /p (page by page)", "dir *.txt (text files only)"],
    dangerLevel: "safe",
    crossRef: {
      powershell: "Get-ChildItem",
      linux: "ls -la",
      macos: "ls -la"
    },
    parametersAr: ["/p عرض صفحة بصفحة", "/w عرض عريض"],
    parametersEn: ["/p Pause after each screen", "/w Wide list format"]
  },
  {
    id: 2,
    category: "file-management",
    system: "powershell",
    command: "Get-ChildItem",
    syntax: "Get-ChildItem [[-Path] <string>] [-Recurse]",
    descriptionAr: "يعرض محتويات المسار مثل الملفات والمجلدات (مقابل dir في CMD).",
    descriptionEn: "Gets the items and child items in one or more specified locations.",
    examplesAr: ["Get-ChildItem C:\\", "Get-ChildItem -Recurse لعرض المجلدات الفرعية"],
    examplesEn: ["Get-ChildItem C:\\", "Get-ChildItem -Recurse (include subdirectories)"],
    dangerLevel: "safe",
    crossRef: {
      "windows-cmd": "dir",
      linux: "ls -la",
      macos: "ls -la"
    },
    parametersAr: ["-Path تحديد المسار", "-Recurse عرض تكراري"],
    parametersEn: ["-Path Specifies a path", "-Recurse Gets items in all child directories"]
  },
  {
    id: 3,
    category: "networking",
    system: "linux",
    command: "ping",
    syntax: "ping [options] <destination>",
    descriptionAr: "يختبر الاتصال بين جهازك وجهاز آخر عبر الشبكة عن طريق إرسال حزم ICMP.",
    descriptionEn: "Send ICMP ECHO_REQUEST to network hosts.",
    examplesAr: ["ping google.com", "ping -c 4 192.168.1.1 لإرسال 4 حزم فقط"],
    examplesEn: ["ping google.com", "ping -c 4 192.168.1.1 (send only 4 packets)"],
    dangerLevel: "safe",
    crossRef: {
      "windows-cmd": "ping -n 4",
      powershell: "Test-Connection -Count 4",
      macos: "ping -c 4"
    },
    parametersAr: ["-c عدد الحزم", "-i الفاصل الزمني بين الحزم"],
    parametersEn: ["-c Stop after sending count packets", "-i Wait interval seconds between packets"]
  }
  // ← أضف باقي الأوامر هنا بنفس التنسيق
];