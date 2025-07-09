import tkinter as tk

window = tk.Tk()
window.title("Mac Window Vibes")
window.geometry("400x200")

label = tk.Label(window, text="Yo, I'm a window GUI!", font=("Helvetica", 16))
label.pack(pady=50)

window2 = tk.Toplevel()
window2.title("Second window!")
window2.geometry("200x400")

label2 = tk.Entry(window2, font=("Helvetica", 14))
label2.pack(pady=50)

window.mainloop()