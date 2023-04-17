import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { getDocs, collection, setDoc, doc, addDoc } from "firebase/firestore";
import { customAlphabet } from "nanoid/non-secure";
import {
  personalityTable,
  personalityWeightTable,
} from "../../../personalityTables";
import { db, auth } from "../../../firebaseConfig";

const nanoid = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ", 10);

async function storeClassInfo(className, classDesc, capacity) {
  try {
    const docRef = await addDoc(collection(db, "class"), {
      className,
      classDesc,
      capacity,
      classID: docRef.id.substring(1, 5),
    });
    const classDocID = docRef.id.substring(1, 5);
    console.log("Document written with ID: ", docRef.id.substring(1, 5));
    await addClassToUser(className, classDocID);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

async function addClassToUser(className, classID) {
  try {
    const userID = auth.currentUser.uid;
    const usersGroupsRef = collection(db, "users", "groups");
    await setDoc(doc(usersGroupsRef, classID), {
      name: className,
    });
    console.log("Document written with ID: ", userID);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export default function CreateClassView() {
  const [className, setClassName] = useState("");
  const [classDesc, setClassDesc] = useState("");
  const [capacity, setCapacity] = useState("");
  const [groupNumber, setGroupNumber] = useState("");
  // const [classIdMessage, setClassIdMessage] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Let&apos;s create your class</Text>
      <TextInput
        onChangeText={setClassName}
        value={className}
        placeholder="Class Name"
        style={styles.textInput}
      />
      <TextInput
        onChangeText={setClassDesc}
        value={classDesc}
        placeholder="Class Description"
        style={styles.textInput}
      />
      <TextInput
        onChangeText={setCapacity}
        value={capacity}
        placeholder="Class Capacity"
        style={styles.textInput}
      />

      <TouchableOpacity
        onPress={() => storeClassInfo(className, classDesc, capacity)}
        style={styles.button}
      >
        <Text style={styles.buttonText}> Create </Text>
      </TouchableOpacity>
      <Text />
      <Text />
      <Text />
      <Text />
      <Text />
      <Text />
      <Text>This is your unique class id: </Text>
      <Text>{`${nanoid(4)}-${nanoid(4)}`}</Text>

      <TextInput
        onChangeText={setGroupNumber}
        value={groupNumber}
        placeholder="Number of groups"
        style={styles.textInput}
      />

      <TouchableOpacity
        onPress={() => balanceGroupsAndSaveToFirestore(groupNumber)}
        style={styles.button}
      >
        <Text style={styles.buttonText}> Assign groups </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  header: {
    fontFamily: "Poppins-Bold",
    fontSize: 25,
    textAlign: "center",
    marginTop: 20,
  },
  textInput: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    width: "70%",
    fontSize: 18,
    marginTop: 40,
  },
  textInputError: {
    borderBottomColor: "red",
    borderBottomWidth: 1,
    width: "70%",
    fontSize: 18,
    marginTop: 40,
  },
  box: {
    width: "65%",
    marginTop: 40,
  },
  dropdown: {
    position: "absolute",
    width: "69.6%",
    marginTop: 40,
  },
  input: {
    width: "100%",
  },
  redirectText: {
    width: "60%",
    marginTop: 10,
  },
  passwordError: {
    marginTop: 10,
  },
  button: {
    marginTop: 40,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: "Poppins-Bold",
  },
});

function balanceGroups(nodes, links, numGroups) {
  const graph = new Map(nodes.map((node) => [node, new Set()]));
  links.forEach((link) => {
    graph.get(link.source).add(link.target);
    graph.get(link.target).add(link.source);
  });

  const nodeArray = Array.from(graph.keys());
  const shuffledNodes = nodeArray.sort(() => Math.random() - 0.5); // shuffle the nodes randomly
  const groupSize = Math.floor(nodeArray.length / numGroups);
  const groups = Array.from({ length: numGroups }, () => new Set());

  // assign nodes to groups
  for (let i = 0; i < numGroups; i += 1) {
    for (
      let j = i * groupSize;
      j < (i + 1) * groupSize && j < shuffledNodes.length;
      j += 1
    ) {
      groups[i].add(shuffledNodes[j]);
    }
  }

  let iterations = 0;
  while (iterations < 100) {
    // calculate the number of links between each group and all other groups
    const groupLinkArray = groups.map((group) =>
      Array.from(group)
        .map((node) => [...graph.get(node)])
        .flat()
        .filter((node) => !group.has(node))
        .reduce((linkCount, node) => {
          const nodeGroup = groups.find((group2) => group2.has(node));
          if (!nodeGroup) {
            return linkCount;
          }
          return linkCount + 1;
        }, 0)
    );

    // calculate the average number of links for each group
    const groupLinks = groupLinkArray.reduce((sum, value) => sum + value, 0);
    const averageLinks = groupLinks / numGroups;

    const maxIndex = groupLinkArray.indexOf(Math.max(...groupLinkArray));
    const minIndex = groupLinkArray.indexOf(Math.min(...groupLinkArray));

    // if the difference between the maximum and minimum number of links is less than the average,
    // then the groups are balanced and we can exit the loop
    if (
      groupLinkArray[maxIndex] - averageLinks <
      averageLinks - groupLinkArray[minIndex]
    ) {
      break;
    }

    // move a node from the group with the most links to the group with the fewest links
    const maxNode = Array.from(groups[maxIndex])[
      Math.floor(Math.random() * groups[maxIndex].size)
    ];
    const minNode = Array.from(groups[minIndex])[
      Math.floor(Math.random() * groups[minIndex].size)
    ];
    groups[maxIndex].delete(maxNode);
    groups[minIndex].add(maxNode);

    iterations += 1;
  }

  return groups.map((group) => Array.from(group));
}

async function balanceGroupsAndSaveToFirestore(groupNumber) {
  console.log("hola");
  // assuming you have already initialized the Firebase SDK and authenticated the user

  // get a reference to the "users" collection
  const docs = [];
  const ids = [];
  const querySnapshot = await getDocs(collection(db, "users"));
  querySnapshot.forEach((doc2) => {
    docs.push({
      id: doc2.id,
      personality: doc2.data().personality,
    });
    ids.push(doc2.id);
  });

  const pairs = [];
  for (let i = 0; i < ids.length; i += 1) {
    for (let j = i + 1; j < ids.length; j += 1) {
      const personality1 = docs.find((doc2) => doc2.id === ids[i]).personality;
      const personality2 = docs.find((doc2) => doc2.id === ids[j]).personality;

      const personality1Index = personalityTable.find(
        (obj) => obj.personality === personality1
      );
      const personality2Index = personalityTable.find(
        (obj) => obj.personality === personality2
      );

      const pweight =
        personalityWeightTable[personality1Index.index][
          personality2Index.index
        ];
      pairs.push({
        source: ids[i],
        target: ids[j],
        weight: pweight,
      });
    }
  }

  console.log(ids);
  console.log(pairs);

  const groupsFound = balanceGroups(ids, pairs, groupNumber);
  if (groupNumber === "") {
    // eslint-disable-next-line no-param-reassign
    groupNumber = 2;
  }

  console.log(groupsFound);

  // const querySnapshot2 = await getDocs(collection(db, "users"));

  const groupId = 1000;
  for (let i = 0; i < groupsFound.length; i += 1) {
    const subList = groupsFound[i];
    for (let j = 0; j < subList.length; j += 1) {
      const groupIndex = i;
      // Update a field in a document using a query
      // const documentsRef = collection(db, 'users');
      // const q = query(documentsRef);
      // console.log(documentsRef)
      // update(q, { groups: groupId+groupIndex })
      //  .then(() => {
      //    console.log('Field updated successfully!');
      //  })
      //  .catch((error) => {
      //    console.error('Error updating field:', error);
      //  });

      // console.log(doc.id, groupId+groupIndex)
    }
  }

  // updateGroups(querySnapshot2, groupsFound)
}
