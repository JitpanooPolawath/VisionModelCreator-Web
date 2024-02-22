import shutil
from ultralytics import YOLO

def printALL(name,model, classes,act):
    listClasses = classes.split(",")


    destination_folder = "./savedModel/"
    model = YOLO(model)  # or select yolov8m/l-world.pt

    # Define custom classes
    model.set_classes(listClasses)

    # # Save the model with the defined offline vocabulary
    model.save(f"{name}-{act}.pt")
    source_file = f"./{name}-{act}.pt"
    shutil.move(source_file, destination_folder)